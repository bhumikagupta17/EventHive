import registrationModel from "../models/registration.model.js"
import eventModel from "../models/event.model.js"

const UPDATABLE_FIELDS = [
  "title", "description", "category", "location", "date", "dateDisplay",
  "bannerUrl", "maxCapacity", "price", "isFree", "organizerName", "organizerEmail",
]

// ─── Get All Events ────────────────────────────────────────────────────────────
export async function getAllEvents(req, res) {
  try {
    const { search, category } = req.query

    const query = {}
    if (search && typeof search === "string") query.$text = { $search: search }
    if (category && typeof category === "string" && category !== "All categories")
      query.category = category

    const events = await eventModel
      .find(query)
      .sort({ date: 1 })
      .populate("organizer", "name email club")

    const shaped = await Promise.all(
      events.map(async (ev) => {
        const organizerId = ev.organizer?._id?.toString()
        const isOwner = req.user && organizerId && organizerId === req.user.id

        if (!isOwner) return ev.toObject()

        const attendeesCount = await registrationModel.countDocuments({ event: ev._id })
        return { ...ev.toObject(), attendeesCount }
      })
    )

    res.json(shaped)
  } catch (err) {
    console.error("[getAllEvents]", err) 
    res.status(500).json({ message: "Failed to fetch events" })
  }
}

// ─── Get Event By ID ───────────────────────────────────────────────────────────
export async function getEventById(req, res) {
  try {
    // Fix #26 — consistent populate with getAllEvents
    const event = await eventModel
      .findById(req.params.id)
      .populate("organizer", "name email club")

    if (!event) return res.status(404).json({ message: "Event not found" })

    const isRegistrationOpen = new Date() < new Date(event.date)

    // Fix #3 (getEventById variant) — was using req.user._id, should be req.user.id
    const isOwner =
      req.user && event.organizer?._id?.toString() === req.user.id

    if (!isOwner) {
      return res.json({ ...event.toObject(), isRegistrationOpen })
    }

    const attendeesCount = await registrationModel.countDocuments({ event: event._id })

    res.json({ ...event.toObject(), attendeesCount, isRegistrationOpen })
  } catch (err) {
    console.error("[getEventById]", err)
    res.status(500).json({ message: "Failed to fetch event" })
  }
}

// ─── Create Event ──────────────────────────────────────────────────────────────
export async function postEvent(req, res) {
  try {
    const {
      title, description, category, location, date, dateDisplay,
      bannerUrl, maxCapacity, price, isFree, organizerName, organizerEmail,
    } = req.body

    if (!title || !location || !date) {
      return res.status(400).json({ message: "title, location and date are required" })
    }

    const event = await eventModel.create({
      title, description, category, location, date, dateDisplay,
      bannerUrl, maxCapacity, price, isFree,
      organizerName: organizerName || req.user.name,
      organizerEmail: organizerEmail || "",
      organizer: req.user.id,
    })

    res.status(201).json(event)
  } catch (err) {
    console.error("[postEvent]", err)
    res.status(500).json({ message: "Failed to create event" })
  }
}

// ─── Update Event ──────────────────────────────────────────────────────────────
export async function updateEvent(req, res) {
  try {
    const event = await eventModel.findById(req.params.id)

    if (!event) return res.status(404).json({ message: "Event not found" })

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "You don't own this event" })
    }

    UPDATABLE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) event[field] = req.body[field]
    })

    await event.save()
    res.json(event)
  } catch (err) {
    console.error("[updateEvent]", err)
    res.status(500).json({ message: "Failed to update event" })
  }
}

// ─── Delete Event ──────────────────────────────────────────────────────────────
export async function deleteEvent(req, res) {
  try {
    const event = await eventModel.findById(req.params.id)

    if (!event) return res.status(404).json({ message: "Event not found" })

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "You don't own this event" })
    }

    await registrationModel.deleteMany({ event: event._id })
    await event.deleteOne()

    res.json({ message: "Event deleted" })
  } catch (err) {
    console.error("[deleteEvent]", err)
    res.status(500).json({ message: "Failed to delete event" })
  }
}

// ─── Get Registrations (for organizer) ────────────────────────────────────────
export async function getRegistrations(req, res) {
  try {
    const event = await eventModel.findById(req.params.id)

    if (!event) return res.status(404).json({ message: "Event not found" })

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "You don't own this event" })
    }

    const regs = await registrationModel
      .find({ event: event._id })
      .populate("student", "name email")

    const attendees = regs.map((r) => ({
      id: r._id,
      name: r.student?.name ?? "Deleted User",
      email: r.student?.email ?? "—",
      ticketType: r.ticketType,
      status: r.status,
      registeredAt: r.createdAt,
    }))

    res.json(attendees)
  } catch (err) {
    console.error("[getRegistrations]", err)
    res.status(500).json({ message: "Failed to fetch registrations" })
  }
}

// ─── Organizer's Own Events ────────────────────────────────────────────────────
export async function organizerEvent(req, res) {
  try {
    const events = await eventModel
      .find({ organizer: req.user.id })
      .sort({ date: 1 })

    const withCounts = await Promise.all(
      events.map(async (ev) => {
        const attendeesCount = await registrationModel.countDocuments({ event: ev._id })
        return { ...ev.toObject(), attendeesCount }
      })
    )

    res.json(withCounts)
  } catch (err) {
    console.error("[organizerEvent]", err)
    res.status(500).json({ message: "Failed to fetch your events" })
  }
}
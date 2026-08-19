export function formatCurrency(amount) {
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function getInitials(name){
    if(!name) return "??"
    const parts=name.trim().split(/\s+/)
    if(parts.length==1) return parts[0].slice(0,2).toUpperCase()
    return (parts[0][0]+parts[parts.length-1][0]).toUpperCase()
}

export function getCategoryBadgeStyle(category) {
  switch (category) {
    case 'Technology':
      return {
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
        pillClass: 'bg-white/90 text-indigo-700 backdrop-blur-xs font-semibold'
      };
    case 'Arts & Culture':
      return {
        bg: 'bg-pink-50',
        text: 'text-pink-700',
        border: 'border-pink-200',
        pillClass: 'bg-white/90 text-pink-700 backdrop-blur-xs font-semibold'
      };
    case 'Athletics':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-800',
        border: 'border-emerald-200',
        pillClass: 'bg-white/90 text-slate-800 backdrop-blur-xs font-semibold'
      };
    case 'Workshop':
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        pillClass: 'bg-white/90 text-purple-700 backdrop-blur-xs font-semibold'
      };
    case 'Regional':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        pillClass: 'bg-white/90 text-amber-800 backdrop-blur-xs font-semibold'
      };
    case 'Social':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        pillClass: 'bg-white/90 text-rose-700 backdrop-blur-xs font-semibold'
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        pillClass: 'bg-white/90 text-indigo-700 backdrop-blur-xs font-semibold'
      };
  }
}

export function getTicketBadgeStyle(type) {
  switch (type) {
    case 'Student':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'General':
    default:
      return 'bg-purple-100 text-purple-800 border-purple-200';
  }
}

/**
 * Format a number as local currency (USD)
 */
export function formatCurrency(amount) {
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Extract 2-letter initials from a full name
 */
export function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Calculate capacity percentage with safe boundaries
 */
export function calculateCapacityPercentage(attendees, maxCapacity) {
  if (!maxCapacity || maxCapacity <= 0) return 0;
  const pct = Math.round((attendees / maxCapacity) * 100);
  return Math.min(100, Math.max(0, pct));
}

/**
 * Color and styling lookup for category tags
 */
export function getCategoryBadgeStyle(category) {
  switch (category) {
    case 'Technology':
      return {
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
        pillClass: 'bg-white/90 text-indigo-700 backdrop-blur-xs font-semibold'
      };
    case 'Arts & Culture':
      return {
        bg: 'bg-pink-50',
        text: 'text-pink-700',
        border: 'border-pink-200',
        pillClass: 'bg-white/90 text-pink-700 backdrop-blur-xs font-semibold'
      };
    case 'Athletics':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-800',
        border: 'border-emerald-200',
        pillClass: 'bg-white/90 text-slate-800 backdrop-blur-xs font-semibold'
      };
    case 'Workshop':
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        pillClass: 'bg-white/90 text-purple-700 backdrop-blur-xs font-semibold'
      };
    case 'Academic':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        pillClass: 'bg-white/90 text-amber-800 backdrop-blur-xs font-semibold'
      };
    case 'Social':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        pillClass: 'bg-white/90 text-rose-700 backdrop-blur-xs font-semibold'
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        pillClass: 'bg-white/90 text-indigo-700 backdrop-blur-xs font-semibold'
      };
  }
}

/**
 * Color and styling lookup for ticket type tags
 */
export function getTicketBadgeStyle(type) {
  switch (type) {
    case 'VIP':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Speaker':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Student':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'General':
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

/**
 * Format date string into human readable format
 */
export function formatFriendlyDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}
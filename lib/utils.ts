export const formatCurrentTime = () => {
    const now = new Date();
    // For todays schedule
    now.setDate(now.getDate() + 1);

    // Set to specific hour and minute if needed (e.g., 6:00 AM)
    now.setHours(6);
    now.setMinutes(0);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
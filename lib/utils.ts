export const formatCurrentTime = () => {
    const now = new Date();
    // For todays schedule
    now.setDate(now.getDate());

    // Set to specific hour and minute if needed (e.g., 6:00 AM)
    now.setHours(6);
    now.setMinutes(0);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  export const formatTomorrowTime = () => {
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

  export function formatTripDuration(duration: string): string {
    const [hoursStr, minutesStr] = duration.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
  
    let result = '';
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m`;
  
    return result.trim();
  }

  

  export const STATION_BY_LINE = {
    'Barrie': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Downsview Park', code: 'DW' },
      { name: 'Rutherford', code: 'RU' },
      { name: 'Maple', code: 'MP' },
      { name: 'King City', code: 'KC' },
      { name: 'Aurora', code: 'AU' },
      { name: 'Newmarket', code: 'NE' },
      { name: 'East Gwillimbury', code: 'EA' },
      { name: 'Bradford', code: 'BD' },
      { name: 'Barrie South', code: 'BA' },
      { name: 'Allandale Waterfront', code: 'AD' },
    ],
    'Kitchener': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Bloor', code: 'BL' },
      { name: 'Weston', code: 'WE' },
      { name: 'Etobicoke North', code: 'ET' },
      { name: 'Malton', code: 'MA' },
      { name: 'Bramalea', code: 'BE' },
      { name: 'Brampton', code: 'BR' },
      { name: 'Mount Pleasant', code: 'MO' },
      { name: 'Georgetown', code: 'GE' },
      { name: 'Acton', code: 'AC' },
      { name: 'Guelph Central', code: 'GL' },
      { name: 'Kitchener', code: 'KI' },
    ],
    'Lakeshore East': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Danforth', code: 'DA' },
      { name: 'Scarborough', code: 'SC' },
      { name: 'Eglinton', code: 'EG' },
      { name: 'Guildwood', code: 'GU' },
      { name: 'Rouge Hill', code: 'RO' },
      { name: 'Pickering', code: 'PIN' },
      { name: 'Ajax', code: 'AJ' },
      { name: 'Whitby', code: 'WH' },
      { name: 'Oshawa', code: 'OS' },
    ],
    'Lakeshore West': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Exhibition', code: 'EX' },
      { name: 'Mimico', code: 'MI' },
      { name: 'Long Branch', code: 'LO' },
      { name: 'Port Credit', code: 'PO' },
      { name: 'Clarkson', code: 'CL' },
      { name: 'Oakville', code: 'OA' },
      { name: 'Bronte', code: 'BO' },
      { name: 'Appleby', code: 'AP' },
      { name: 'Burlington', code: 'BU' },
      { name: 'Aldershot', code: 'AL' },
      { name: 'Hamilton', code: 'HA' },
      { name: 'West Harbour', code: 'WR' },
      { name: 'St. Catharines', code: 'SCTH' },
      { name: 'Niagara Falls', code: 'NI' },
    ],
    'Milton': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Kipling', code: 'KP' },
      { name: 'Dixie', code: 'DI' },
      { name: 'Cooksville', code: 'CO' },
      { name: 'Erindale', code: 'ER' },
      { name: 'Streetsville', code: 'SR' },
      { name: 'Meadowvale', code: 'ME' },
      { name: 'Lisgar', code: 'LS' },
      { name: 'Milton', code: 'ML' },
    ],
    'Richmond Hill': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Oriole', code: 'OR' },
      { name: 'Old Cummer', code: 'OL' },
      { name: 'Langstaff', code: 'LA' },
      { name: 'Richmond Hill', code: 'RI' },
      { name: 'Gormley', code: 'GO' },
      { name: 'Bloomington', code: 'BM' },
    ],
    'Stouffville': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Kennedy', code: 'KE' },
      { name: 'Agincourt', code: 'AG' },
      { name: 'Milliken', code: 'MK' },
      { name: 'Unionville', code: 'UI' },
      { name: 'Centennial', code: 'CE' },
      { name: 'Markham', code: 'MR' },
      { name: 'Mount Joy', code: 'MJ' },
      { name: 'Stouffville', code: 'ST' },
      { name: 'Old Elm', code: 'LI' },
    ],
  };
  

  export const GOLINES = [
    'Barrie', 
    'Kitchener', 
    'Lakeshore East', 
    'Lakeshore West', 
    'Milton', 
    'Richmond Hill', 
    'Stouffville'
  ];
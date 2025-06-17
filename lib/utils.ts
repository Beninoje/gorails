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
      { name: 'Bloor', code: 'KE' },
      { name: 'Weston', code: 'AG' },
      { name: 'Etobicoke North', code: 'MI' },
      { name: 'Malton', code: 'UV' },
      { name: 'Bramalea', code: 'CE' },
      { name: 'Brampton', code: 'MK' },
      { name: 'Mount Pleasant', code: 'MJ' },
      { name: 'Georgetown', code: 'ST' },
      { name: 'Acton', code: 'LI' },
      { name: 'Guelph Central', code: 'LI' },
      { name: 'Kitchener', code: 'LI' },
    ],
    'Lakeshore East': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Danforth', code: 'KE' },
      { name: 'Scarborough', code: 'AG' },
      { name: 'Eglinton', code: 'MI' },
      { name: 'Guildwood', code: 'UV' },
      { name: 'Rouge Hill', code: 'CE' },
      { name: 'Pickering', code: 'MK' },
      { name: 'Ajax', code: 'MJ' },
      { name: 'Whitby', code: 'ST' },
      { name: 'Oshawa', code: 'LI' },
    ],
    'Lakeshore West': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Exhibition', code: 'KE' },
      { name: 'Mimco', code: 'AG' },
      { name: 'Long Beach', code: 'MI' },
      { name: 'Port Credit', code: 'UV' },
      { name: 'Clarkson', code: 'CE' },
      { name: 'Oakville', code: 'MK' },
      { name: 'Bronte', code: 'MJ' },
      { name: 'Appleby', code: 'ST' },
      { name: 'Burlington', code: 'LI' },
      { name: 'Aldershot', code: 'LI' },
      { name: 'Hamilton', code: 'LI' },
      { name: 'West Harbour', code: 'LI' },
      { name: 'St. Catharines', code: 'LI' },
      { name: 'Niagara Falls', code: 'LI' },
    ],
    'Milton': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Kipling', code: 'KE' },
      { name: 'Dixie', code: 'AG' },
      { name: 'Cooksville', code: 'MI' },
      { name: 'Erindale', code: 'UV' },
      { name: 'Streetsville', code: 'CE' },
      { name: 'Meadowvale', code: 'MK' },
      { name: 'Lisgar', code: 'MJ' },
      { name: 'Milton', code: 'ST' },
    ],
    'Richmond Hill': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Oriole', code: 'KE' },
      { name: 'Old Cummer', code: 'AG' },
      { name: 'Langstaff', code: 'MI' },
      { name: 'Richmond Hill', code: 'UV' },
      { name: 'Gormley', code: 'CE' },
      { name: 'Bloominton', code: 'MK' },
    ],
    'Stouffville': [
      { name: 'Union Station', code: 'UN' },
      { name: 'Kennedy', code: 'KE' },
      { name: 'Agincourt', code: 'AG' },
      { name: 'Milliken', code: 'MI' },
      { name: 'Unionville', code: 'UV' },
      { name: 'Centennial', code: 'CE' },
      { name: 'Markham', code: 'MK' },
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
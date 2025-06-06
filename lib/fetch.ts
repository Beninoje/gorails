import { useCallback, useEffect, useState } from "react";
import { formatCurrentTime } from "./utils";
import { useTripStore } from "@/store/useTripStore";

export const fetchAPI = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  export const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
  
      try {
        const result = await fetchAPI(url);

        setData(result.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }, [url]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    return { data, loading, error, refetch: fetchData };
  };
  export const useFetchAllRides= <T>(url:string)=>{
    const [trainTrips, setTrainTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
     const { origin, destination } = useTripStore();
    useEffect(() => {
        const fetchTrainData = async () => {
          try {
            setLoading(true)
            const data = await fetchAPI(url);
            
            const railTrips=[];
            data.trips.forEach(trip => {
              const railLines = trip.lines.filter(line => 
                line.transitType === 1 &&
                line.fromStopCode === origin &&
                line.toStopCode === destination
              );
              
              if (railLines.length > 0) {
                railTrips.push({
                  departureTime: trip.departureTimeDisplay,
                  arrivalTime: trip.arrivalTimeDisplay,
                  duration: trip.duration,
                  railLines: railLines.map(line => ({
                    tripNumber: line.tripNumber,
                    from: line.fromStopDisplay.replace(" GO"," "),
                    to: line.toStopDisplay.replace(" GO"," "),
                    departure: line.fromStopTime,
                    arrival: line.toStopTime,
                    stops: line.stops.map(stop => ({
                      name: stop.name,
                      code: stop.code,
                      time: stop.time
                    }))
                  }))
                });
              }
            });
            setTrainTrips(railTrips);
          } catch (error) {
            console.error('Failed to fetch GO Train data:', error);
            setLoading(false);
            setError(error);
          }finally{
            setLoading(false)
          }
        };
    
        fetchTrainData();
      }, []);
      return {recentRides: trainTrips, loading, error}
  }
import { useQuery } from "react-query";
import axios from "axios";

const BASE_URL = "http://172.30.1.8:3001/api";

export interface Biography {
  country: string;
  position: Position;
  company: Company;
  date: string;
}

export interface Company {
  name: string;
  roleSummary: string;
}

export interface Position {
  lng: number;
  lat: number;
}

//172.30.1.8:3001/api/biography
export function useBiography() {
  const query = useQuery<Biography[]>("product", () => {
    return axios(`${BASE_URL}/biography`, {
      timeout: 30000,
    }).then((res) => {
      const processes = res.data.map((item: Biography) => {
        return {
          ...item,
          position: {
            // 숫자에서 뒤에서 8자리위치에 .을 삽입함
            lat: Number(
              item.position.lat.toString().slice(0, -8) +
                "." +
                item.position.lat.toString().slice(-8)
            ),
            lng: Number(
              item.position.lng.toString().slice(0, -8) +
                "." +
                item.position.lng.toString().slice(-8)
            ),
          },
        };
      });
      /**한국만 데이터가 반대라 임시로 이렇게처리 */
      const newProcesses = JSON.parse(JSON.stringify(processes));
      newProcesses[4].position.lng = processes[4].position.lat;
      newProcesses[4].position.lat = processes[4].position.lng;

      return newProcesses;
    });
  });
  return query;
}

export function useProductSupply() {
  const query = useQuery(`${BASE_URL}/supplyChainLog?entity=FootFab`, () => {
    return axios(`${BASE_URL}/supplyChainLog?entity=FootFab`, {
      timeout: 30000,
    }).then((res) => res.data);
  });
  return query;
}

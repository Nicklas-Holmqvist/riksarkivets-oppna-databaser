import { supabase } from '../../lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

import { KurhusetList } from '../../types/KurhusetIOstersund';

type Data = {
  data: KurhusetList[] | null;
  count: number;
};

type NextApiRequestProps = NextApiRequest & {
  body: {
    database: string;
    search: string;
    pagination: {
      perPage: number;
      page: number;
    };
  };
};

export default async function handler(
  req: NextApiRequestProps,
  res: NextApiResponse<Data>
) {
  const { database, search, pagination } = req.body;

  const indexOfLastItem = pagination.page * pagination.perPage;
  const indexOfFirstItem = indexOfLastItem - pagination.perPage;

  if (search !== '') {
    try {
      const { data, count, error } = await supabase
        .from(database)
        .select(
          'list_order, number, date_of_enrollment, first_name, last_name, age, disease, discharge_date, discharge_status',
          { count: 'exact' }
        )
        .or(
          `first_name.ilike.${search},last_name.ilike.${search},village.ilike.${search},parish.ilike.${search},discharge_status.ilike.${search},disease.ilike.${search},disease.match.${search},full_name.ilike.${search},title.ilike.${search},title.match.${search}`
        )
        .order('list_order', { ascending: true })
        .range(indexOfFirstItem, indexOfLastItem);

      if (error) {
        const fetchedData = {
          data: [],
          count: 0,
          error: error,
        };
        res.status(500).json(fetchedData);
      }
      const fetchedData = {
        data: data,
        count: Number(count),
        error: error,
      };
      res.status(200).json(fetchedData);
    } catch (error) {
      const fetchedData = {
        data: [],
        count: 0,
        error: error,
      };
      res.status(500).json(fetchedData);
    }
  } else {
    try {
      const { data, count, error } = await supabase
        .from(database)
        .select(
          'list_order, number, date_of_enrollment, first_name, last_name, age, disease, discharge_date, discharge_status',
          { count: 'exact' }
        )
        .order('list_order', { ascending: true })
        .range(indexOfFirstItem, indexOfLastItem);
      if (error) {
        const fetchedData = {
          data: [],
          count: 0,
          error: error,
        };
        res.status(500).json(fetchedData);
      }
      const fetchedData = {
        data: data,
        count: Number(count),
        error: error,
      };
      res.status(200).json(fetchedData);
    } catch (error) {
      const fetchedData = {
        data: [],
        count: 0,
        error: error,
      };
      res.status(500).json(fetchedData);
    }
  }
}

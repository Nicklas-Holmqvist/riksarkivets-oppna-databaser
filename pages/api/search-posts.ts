import { supabase } from '../../lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

import { KurhusetIOstersund } from '../../types/KurhusetIOstersund';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

type Data = {
  data: KurhusetIOstersund[] | null;
  count: any;
  error: any;
};

type NextApiRequestProps = NextApiRequest & {
  body: {
    searchDB: string;
    searchValue: string;
  };
};

export default async function handler(
  req: NextApiRequestProps,
  res: NextApiResponse<Data>
) {
  const { searchDB, searchValue } = req.body;
  try {
    const { data, count, error } = await supabase
      .from(searchDB)
      .select('*', { count: 'exact' })
      .or(
        `first_name.ilike.${searchValue},last_name.ilike.${searchValue},village.ilike.${searchValue},parish.ilike.${searchValue},discharge_status.ilike.${searchValue},disease.ilike.${searchValue},full_name.ilike.${searchValue}`
      )
      .order('list_order', { ascending: true })
      .range(0, 24);
    if (error) {
      const fetchedData = {
        data: [],
        count: 0,
        error: error,
      };
      res.status(500).json(fetchedData);
    } else {
    }
    const fetchedData = {
      data: data,
      count: count,
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

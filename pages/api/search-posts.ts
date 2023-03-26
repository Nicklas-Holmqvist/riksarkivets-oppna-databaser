import { supabase } from '../../lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

import { KurhusetList } from '../../types/KurhusetIOstersund';

type Data = {
  data: KurhusetList[] | null;
  count: number;
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
  const { database, searchValue } = req.body;

  const formattedSearch = searchValue.toLowerCase();

  try {
    const { data, count, error } = await supabase
      .from(database)
      .select(
        'list_order, number, date_of_enrollment, first_name, last_name, age, disease, discharge_date, discharge_status',
        { count: 'exact' }
      )
      .or(
        `first_name.ilike.${formattedSearch},last_name.ilike.${formattedSearch},village.ilike.${formattedSearch},parish.ilike.${formattedSearch},discharge_status.ilike.${formattedSearch},disease.ilike.${formattedSearch},disease.match.${formattedSearch},full_name.ilike.${formattedSearch},title.ilike.${formattedSearch},title.match.${formattedSearch}`
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

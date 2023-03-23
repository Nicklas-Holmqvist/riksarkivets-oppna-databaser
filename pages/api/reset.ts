import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../lib/supabaseClient';
import { KurhusetIOstersund } from '../../types/KurhusetIOstersund';

type Data = {
  data: KurhusetIOstersund[] | null;
  count: any;
  error: any;
};

type NextApiRequestProps = NextApiRequest & {
  body: {
    searchDB: string;
  };
};

export default async function handler(
  req: NextApiRequestProps,
  res: NextApiResponse<Data>
) {
  const { searchDB } = req.body;

  try {
    const { data, count, error } = await supabase
      .from(searchDB)
      .select('*', { count: 'exact' })
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

import { supabase } from '../../lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

import { KurhusetListItem } from '../../types/KurhusetIOstersund';

type Data = {
  data: KurhusetListItem[] | null;
};

type NextApiRequestProps = NextApiRequest & {
  body: {
    searchDB: string;
    id: string;
  };
};

export default async function handler(
  req: NextApiRequestProps,
  res: NextApiResponse<Data>
) {
  const { database, id } = req.body;

  try {
    const { data, error } = await supabase
      .from(database)
      .select('*')
      .eq('list_order', id);
    if (error) {
      const fetchedData = {
        data: [],
        error: error,
      };
      res.status(500).json(fetchedData);
    }
    const fetchedData = {
      data: data,
      error: error,
    };
    res.status(200).json(fetchedData);
  } catch (error) {
    const fetchedData = {
      data: [],
      error: error,
    };
    res.status(500).json(fetchedData);
  }
}

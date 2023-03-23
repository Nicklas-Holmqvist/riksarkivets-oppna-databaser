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
  const { data, count, error } = await supabase
    .from(searchDB)
    .select('*', { count: 'exact' })
    .or(
      `first_name.eq.${capitalizeFirstLetter(
        searchValue
      )},last_name.eq.${capitalizeFirstLetter(
        searchValue
      )},village.eq.${capitalizeFirstLetter(
        searchValue
      )},parish.eq.${capitalizeFirstLetter(
        searchValue
      )},discharge_status.eq.${capitalizeFirstLetter(
        searchValue
      )},disease.eq.${capitalizeFirstLetter(searchValue)}`
    )
    .order('list_order', { ascending: true })
    .range(0, 24);
  if (error) {
    const fetchedData = {
      data: [],
      count: 0,
      error: error,
    };
    res.status(200).json(fetchedData);
  } else {
  }
  const fetchedData = {
    data: data,
    count: count,
    error: error,
  };
  res.status(200).json(fetchedData);
}

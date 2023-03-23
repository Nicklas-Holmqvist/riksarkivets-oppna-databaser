import { supabase } from '../../lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

import { KurhusetIOstersund } from '../../types/KurhusetIOstersund';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

type Data = {
  data: KurhusetIOstersund[] | null;
  count: any;
};

type NextApiRequestProps = NextApiRequest & {
  body: {
    searchDB: string;
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
  const { searchDB, search, pagination } = req.body;

  const indexOfLastItem = pagination.page * pagination.perPage;
  const indexOfFirstItem = indexOfLastItem - pagination.perPage;

  if (search !== '') {
    try {
      const { data, count, error } = await supabase
        .from(searchDB)
        .select('*', { count: 'exact' })
        .or(
          `first_name.eq.${capitalizeFirstLetter(
            search
          )},last_name.eq.${capitalizeFirstLetter(
            search
          )},village.eq.${capitalizeFirstLetter(
            search
          )},parish.eq.${capitalizeFirstLetter(
            search
          )},discharge_status.eq.${capitalizeFirstLetter(
            search
          )},disease.eq.${capitalizeFirstLetter(search)}`
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
  } else {
    try {
      const { data, count, error } = await supabase
        .from(searchDB)
        .select('*', { count: 'exact' })
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
}

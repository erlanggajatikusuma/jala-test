import Axios from 'axios';

export const API_HOST = {
  prices:
    'https://app.jala.tech/api/shrimp_prices?per_page=15&page=1&with=region,creator&region_id=',
  news: 'https://app.jala.tech/api/posts?per_page=15&page=1&with=creator',
  diseases: 'https://app.jala.tech/api/diseases?per_page=15&page=1',
  search: 'https://app.jala.tech/api/regions?has=shrimp_prices&search=',
};

export const token =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcwY2UyYjZjNzEzNjkyZmVjNDEwMTJjODYwMjRhMzM4M2ZiOGZjNDI0NDU3NzFmMjMwNjIyMDFkOTJlNDZlYzIxNjYwNTk3ZjdlY2I4YzU4In0.eyJhdWQiOiIxIiwianRpIjoiNzBjZTJiNmM3MTM2OTJmZWM0MTAxMmM4NjAyNGEzMzgzZmI4ZmM0MjQ0NTc3MWYyMzA2MjIwMWQ5MmU0NmVjMjE2NjA1OTdmN2VjYjhjNTgiLCJpYXQiOjE2MzU5OTYyNzEsIm5iZiI6MTYzNTk5NjI3MSwiZXhwIjoxNjY3NTMyMjcxLCJzdWIiOiI3NyIsInNjb3BlcyI6W119.F1bxyaeDygJb66xI3gDYBWmoN_JObb4jItMEtGzDFuW2w9dlA_zglk0CbqZ-keBO3a3w75Ui3t5XoE5I2lV3PP0BMZC7fFgx00sicEVrzNFlt2oUzj5n3RgpGFnclJHmnX-ObSBk-1efciBdB0PcrSMjQp4HrhQXVkzN-Xd4debnzohNOX8nhqdf3GLOoQm8Fak6nSGWy0-vsY9J4mLjzNcPtkBA5lfPk9Z_TCzNUSy1iOyE8sZHcYQSGfehcXISOL1Oev_djgyVzzbZ45jW1GDujO4d94xqY2EdDDpPuKd2bMnA9FOgfoRrxvIJ8u1AFvr6A_QBzH1kwJfWems2_jlpF91C2ZYm1LQhf4DAMoaNZhd1SDYJheh_Nx8mgeYgBgqcWv2tD-1u0-ghyTfN950NelZ_IdUxDJ_Z9riLjDrDJ96WEJNp7pxHJfc34IM5Ok4Im1ewZr8VIIGoXY5u01in_af2JWpKfeODACPO7I2xheMX6c7NInDArMBByB31CUi_NvhJtDoYAZLCeNBWsAG3AGNapl5gue2EdYj263QrfadWtDp5scGaW1f1sINLo9e_HZceLplR336MABHy9wwkK2VW0zgmG11boF3RMZkPTvRe8BSXrqzoz1Ud30NI8JUZjJ-GatDlAHSvBYYqpEe1Wn8v-YwXZsduZF-JNl0';

export const getData = (urlLink, auth) => {
  return new Promise((resolve, reject) => {
    if (auth) {
      Axios.get(urlLink, { headers: { Authorization: token } })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    } else {
      Axios.get(urlLink)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }
  });
};

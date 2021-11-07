import { Share } from 'react-native';

export const token =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcwY2UyYjZjNzEzNjkyZmVjNDEwMTJjODYwMjRhMzM4M2ZiOGZjNDI0NDU3NzFmMjMwNjIyMDFkOTJlNDZlYzIxNjYwNTk3ZjdlY2I4YzU4In0.eyJhdWQiOiIxIiwianRpIjoiNzBjZTJiNmM3MTM2OTJmZWM0MTAxMmM4NjAyNGEzMzgzZmI4ZmM0MjQ0NTc3MWYyMzA2MjIwMWQ5MmU0NmVjMjE2NjA1OTdmN2VjYjhjNTgiLCJpYXQiOjE2MzU5OTYyNzEsIm5iZiI6MTYzNTk5NjI3MSwiZXhwIjoxNjY3NTMyMjcxLCJzdWIiOiI3NyIsInNjb3BlcyI6W119.F1bxyaeDygJb66xI3gDYBWmoN_JObb4jItMEtGzDFuW2w9dlA_zglk0CbqZ-keBO3a3w75Ui3t5XoE5I2lV3PP0BMZC7fFgx00sicEVrzNFlt2oUzj5n3RgpGFnclJHmnX-ObSBk-1efciBdB0PcrSMjQp4HrhQXVkzN-Xd4debnzohNOX8nhqdf3GLOoQm8Fak6nSGWy0-vsY9J4mLjzNcPtkBA5lfPk9Z_TCzNUSy1iOyE8sZHcYQSGfehcXISOL1Oev_djgyVzzbZ45jW1GDujO4d94xqY2EdDDpPuKd2bMnA9FOgfoRrxvIJ8u1AFvr6A_QBzH1kwJfWems2_jlpF91C2ZYm1LQhf4DAMoaNZhd1SDYJheh_Nx8mgeYgBgqcWv2tD-1u0-ghyTfN950NelZ_IdUxDJ_Z9riLjDrDJ96WEJNp7pxHJfc34IM5Ok4Im1ewZr8VIIGoXY5u01in_af2JWpKfeODACPO7I2xheMX6c7NInDArMBByB31CUi_NvhJtDoYAZLCeNBWsAG3AGNapl5gue2EdYj263QrfadWtDp5scGaW1f1sINLo9e_HZceLplR336MABHy9wwkK2VW0zgmG11boF3RMZkPTvRe8BSXrqzoz1Ud30NI8JUZjJ-GatDlAHSvBYYqpEe1Wn8v-YwXZsduZF-JNl0';

export const sizes = [
  20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
];

export const handleShare = async (url) => {
  try {
    const result = await Share.share({
      message: url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // alert(error.message);
    console.log('ERR SHARE ===> ', error.message);
  }
};

export const getDate = (data) => {
  let d = new Date(data);

  let year = d.getFullYear();
  let month = d.getMonth();
  let date = d.getDate();
  let day = d.getDay();

  switch (day) {
    case 0:
      day = 'Minggu';
      break;
    case 1:
      day = 'Senin';
      break;
    case 2:
      day = 'Selasa';
      break;
    case 3:
      day = 'Rabu';
      break;
    case 4:
      day = 'Kamis';
      break;
    case 5:
      day = "Jum'at";
      break;
    case 6:
      day = 'Sabtu';
      break;
  }
  switch (month) {
    case 0:
      month = 'Januari';
      break;
    case 1:
      month = 'Februari';
      break;
    case 2:
      month = 'Maret';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'Mei';
      break;
    case 5:
      month = 'Juni';
      break;
    case 6:
      month = 'Juli';
      break;
    case 7:
      month = 'Agustus';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'Oktober';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'Desember';
      break;
  }

  const result = `${date} ${month} ${year}`;

  return result;
};

export const formatRupiah = (num) => {
  var reverse = num.toString().split('').reverse().join('');
  let ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join('.').split('').reverse().join('');

  return ribuan;
};

import { Share } from 'react-native';

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

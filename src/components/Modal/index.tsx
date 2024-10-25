import Swal from 'sweetalert2';

export default function Modal(title: string, text: string) {
  const confirmation = () => {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonText: 'Ok',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const success = () => {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const error = () => {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Ok',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  return { confirmation, success, error };
}

import Swal from 'sweetalert2';

export default function Modal(title: string, text: string) {
  const confirmation = () => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonText: 'Ok',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const success = () => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const error = () => {
    Swal.fire({
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

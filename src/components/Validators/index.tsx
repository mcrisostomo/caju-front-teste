export default function validators() {
  // Fonte: https://www.geradorcpf.com/javascript-validar-cpf.htm
  const cpfValidator = (cpf: any) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
  };

  const applyCpfMask = (cpf: string) => {
    // Remove caracteres não numéricos e aplica o formato
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const emailValidator = (email: any) => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };

  const nameValidator = (name: any) => {
    const nameRegex = /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/;

    return nameRegex.test(name);
  };

  const dateFormater = (value: string) => {
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  };

  return {
    cpfValidator,
    applyCpfMask,
    emailValidator,
    nameValidator,
    dateFormater,
  };
}

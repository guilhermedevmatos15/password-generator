export default function evaluatePasswordStrength(password) {
   password = String(password);
   let strength = 0;

   password.length >= 8 && (strength++);
   /[A-Z]/.test(password) && (strength++);
   /[0-9]/.test(password) && (strength++);
   /[\W_]/.test(password) && (strength++);

   password.length >= 20 && (strength = 4);

   return strength;
}

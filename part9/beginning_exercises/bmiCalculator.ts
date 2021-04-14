export const calculateBMI = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const heightSquared = heightInMeters * heightInMeters;
  const BMI = weight / heightSquared;

  //console.log(`Your BMI is ${BMI}`)
  let result = "";
  if (BMI < 15) result = "Very severely underweight";
  if (BMI > 15 && BMI < 16) result = "Severely underweight";
  if (BMI > 16 && BMI < 18.5) result = "Underweight";
  if (BMI > 18.5 && BMI < 25) result = "Normal (healthy weight)";
  if (BMI > 25 && BMI < 30) result = "Overweight";
  if (BMI > 30 && BMI < 35) result = "Obese Class I (Moderately obese)";
  if (BMI > 35 && BMI < 40) result = "Obese Class II (Severely obese)";
  if (BMI > 40) result = "Obese Class III (Very severely obese)";
  
  return result;
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(calculateBMI(height, weight));
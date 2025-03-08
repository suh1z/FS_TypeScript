export const calculateBmi = (cm: number, kg: number): string => {
  if (!isNaN(Number(cm)) && !isNaN(Number(kg))) {
    const meters = cm / 100;
    const BMI = kg/(meters *  meters);
    if (BMI < 16.0) {
      return "Underweight (Severe thinness)";
    } else if (BMI >= 16.0 && BMI <= 16.9) {
      return "Underweight (Moderate thinness)";
    } else if (BMI >= 17.0 && BMI <= 18.4) {
      return "Underweight (Mild thinness)";
    } else if (BMI >= 18.5 && BMI <= 24.9) {
      return "Normal range";
    } else if (BMI >= 25.0 && BMI <= 29.9) {
      return "Overweight (Pre-obese)";
    } else if (BMI >= 30.0 && BMI <= 34.9) {
      return "Obese (Class I)";
    } else if (BMI >= 35.0 && BMI <= 39.9) {
      return "Obese (Class II)";
    } else {
      return "Obese (Class III)";
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

if (require.main === module) {
  try {
    if (process.argv.length < 4) throw new Error('Not enough arguments');
    if (process.argv.length > 4) throw new Error('Too many arguments');
    const cm: number = Number(process.argv[2]);
    const number: number = Number(process.argv[3]);
    console.log(calculateBmi(cm, number));
  } catch (error: unknown) {
    let errorMessage = 'Something happened';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
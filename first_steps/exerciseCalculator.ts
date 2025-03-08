interface Week {
    periodLength: number;
    trainingDays: number;
    succes: boolean;
    rating: number;
    ratingDescription: string,
    target: number;
    average: number;
  };
 
interface Inputs {
    dailyExerciseHours: number [];
    target: number;
};

  export function calculateExercises(dailyExerciseHours: number[], target: number): Week {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(index => index > 0).length;
    const average = dailyExerciseHours.reduce((acc, cur) => acc + cur, 0) / periodLength;
    const succes = average >= target;
    const rating = average >= target ? 3 : average >= target * 0.5 ? 2 : 1;
    const ratingDescription = average >= target
      ? 'Excellent'
      : average >= target * 0.5
      ? 'Not too bad but could be better'
      : 'It seems like a resting week';

    return {
        periodLength,
        trainingDays,
        succes,
        rating,
        ratingDescription,
        target,
        average
    };
  }
   
  const parseArguments = (args: string[]): Inputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const dailyExerciseHours: number[] = args.slice(2).map(Number);
    const target: number = dailyExerciseHours.shift() || 0;
    if (dailyExerciseHours.every(hour => !isNaN(hour)) && !isNaN(target)) {
      return {
        dailyExerciseHours,
        target
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  

  try {
    const { dailyExerciseHours, target } = parseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: '  + error.message;
    }
    console.log(errorMessage);
  }

export default calculateExercises;
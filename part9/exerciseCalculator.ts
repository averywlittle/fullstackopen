interface exerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
};

const calculateExercises = (exerciseHours: Array<number>): exerciseResult => {
    const target = 1;
    const result = {
        periodLength: exerciseHours.length,
        trainingDays: exerciseHours.filter(hours => hours > 0).length,
        success: true,
        rating: 2,
        ratingDescription: "you can always do better",
        target: target,
        average: exerciseHours.reduce((acc, cur) => acc + cur) / exerciseHours.length
    };

    return result;
};

console.log("Your exercise result is ", calculateExercises([3, 0, 2, 4.5, 0, 2, 4]));
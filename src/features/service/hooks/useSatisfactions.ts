import { useState } from "react";

export default function useSatisfactions() {
    //価格の満足度
    const [priceSatisfaction, setPriceSatisfaction] = useState<number>(0);

    //スピードの満足度
    const [speedSatisfaction, setSpeedSatisfaction] = useState<number>(0);

    //対応の満足度
    const [responseSatisfaction, setResponseSatisfaction] = useState<number>(0);

    //コスパの満足度
    const [costPerformanceSatisfaction, setCostPerformanceSatisfaction] = useState<number>(0);

    return {
        priceSatisfaction, setPriceSatisfaction,
        speedSatisfaction, setSpeedSatisfaction,
        responseSatisfaction, setResponseSatisfaction,
        costPerformanceSatisfaction, setCostPerformanceSatisfaction
    }
}
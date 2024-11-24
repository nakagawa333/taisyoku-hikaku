import useSatisfactions from "../hooks/useSatisfactions";
import SatisfactionsReview from "./satisfactionsReview";

export default function Satisfactions() {
    const {
        priceSatisfaction, setPriceSatisfaction,
        speedSatisfaction, setSpeedSatisfaction,
        responseSatisfaction, setResponseSatisfaction,
        costPerformanceSatisfaction, setCostPerformanceSatisfaction
    } = useSatisfactions();

    return (
        <div className="bg-gray-50 mx-auto max-w-sm shadow-md rounded-lg overflow-hidden">

            <div className="w-11/12 mx-auto mb-2">
                <SatisfactionsReview
                    label="価格の満足度"
                    satisfaction={priceSatisfaction}
                    setSatisfaction={setPriceSatisfaction}
                />

                <SatisfactionsReview
                    label="スピードの満足度"
                    satisfaction={speedSatisfaction}
                    setSatisfaction={setSpeedSatisfaction}
                />

                <SatisfactionsReview
                    label="対応の満足度"
                    satisfaction={responseSatisfaction}
                    setSatisfaction={setResponseSatisfaction}
                />

                <SatisfactionsReview
                    label="コスパの満足度"
                    satisfaction={costPerformanceSatisfaction}
                    setSatisfaction={setCostPerformanceSatisfaction}
                />
            </div>
        </div>
    )
} 
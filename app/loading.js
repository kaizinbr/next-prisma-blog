export default function LoadingFullPage() {
    return (
        <div className="h-[calc(100vh-64px)] w-full flex justify-center items-center m-auto">
            <svg className="spinner box-border w-20 h-20 p-[3px] overflow-visible">
                <circle className="stroke-violet-500">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="-90;810"
                        keyTimes="0;1"
                        dur="2s"
                        repeatCount="indefinite"
                    ></animateTransform>
                    <animate
                        attributeName="stroke-dashoffset"
                        values="0%;0%;-157.080%"
                        calcMode="spline"
                        keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
                        keyTimes="0;0.5;1"
                        dur="2s"
                        repeatCount="indefinite"
                    ></animate>
                    <animate
                        attributeName="stroke-dasharray"
                        values="0% 314.159%;157.080% 157.080%;0% 314.159%"
                        calcMode="spline"
                        keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
                        keyTimes="0;0.5;1"
                        dur="2s"
                        repeatCount="indefinite"
                    ></animate>
                </circle>
            </svg>
        </div>
    );
}

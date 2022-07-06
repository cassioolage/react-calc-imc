import { useState } from "react";
import Swal from "sweetalert2";
import { GridItem } from "./components/GridItem";

import { levels, calculateIMC, Level} from './helpers/imc';
import logo from "./assets/powered.png";
import Arrow from './assets/leftarrow.png';

export default function App(){

    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [showMVC, setShowMVC] = useState<Level | null>(null);
    const handleCalculateButton = () =>{
        if(heightField && weightField){
            setShowMVC(calculateIMC(heightField, weightField));
        }
        else{
            Swal.mixin({
                customClass:{
                    confirmButton: "ring-2 outline-none bg-white text-blue-300 px-6 py-3 rounded hover:bg-blue-300 hover:text-white"
                },
                buttonsStyling: false
            }).fire({
                title: "Whooops",
                text: "Preencha todos os campos",
                icon: "error",
                confirmButtonColor: "rgb(229 231 235)" 
            })
        }
    }
    const handleBackButton = () =>{
        setHeightField(0);
        setWeightField(0);
        setShowMVC(null);
    }

    return (
        <div className="pb-10">
            <header className="md:px-5 md:py-0">
                <div className="max-w-4xl mx-auto my-10">
                    <img src={logo} alt="Logo do Projeto" width={150} />
                </div>
            </header>
            <div className="max-w-4xl mx-auto flex gap-20 md:px-5 md:py-0 md:flex-col">
                <div className="flex-1 ">
                    <header>
                        <h1 className="text-4xl text-slate-700 font-bold mb-5">Calcule seu IMC.</h1>
                    </header>
                    <p className="text-slate-500 mb-5 text-base leading-tight">IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

                    <input type="number"
                        className="border-b border-gray-700 w-full mb-3 px-1 py-2 text-[14px] outline-none disabled:opacity-50" 
                        placeholder="Digite sua altura. Ex: 1.5 (em metros)"
                        value={heightField > 0 ? heightField : ""}
                        onChange={e => setHeightField(parseFloat(e.target.value))}
                        disabled={showMVC ? true : false}
                    />
                    <input type="number"
                        className="border-b border-gray-700 w-full mb-3 px-1 py-2 text-[14px] outline-none disabled:opacity-50" 
                        placeholder="Digite sua peso. Ex: 75.3 (em kg)"
                        value={weightField > 0 ? weightField : ""}
                        onChange={e => setWeightField(parseFloat(e.target.value))}
                        disabled={showMVC ? true : false}
                    />
                    <button className={`bg-blue-400 text-white py-3 px-0 w-full mt-5 cursor-pointer rounded-xl text-base border-0  transition-colors duration-300 ${!showMVC && ("hover:bg-blue-600")} disabled:opacity-50`} onClick={handleCalculateButton} disabled={showMVC ? true : false}>Calcular</button>
                </div>
                <div className="flex-1 flex m-0">
                {
                    !showMVC ? 
                    (
                        <div className="flex-1 grid grid-cols-2 gap-5 sm:grid-cols-1">
                            {
                            levels.map( (level, index) => (
                                <GridItem key={index} data={level} />
                            ))
                            }
                        </div>
                    )
                    :
                    (
                        <div className="flex-1 flex">
                            <div className="absolute bg-blue-400 w-[70px] h-[70px] rounded-full flex justify-center items-center cursor-pointer -ml-[35px] mt-32 hover:bg-blue-600 transition-colors duration-300 md:ml-0 md:mt-0 md:rounded-xl md:rotate-90" onClick={handleBackButton}>
                                <img src={Arrow} alt="Arrow" width={25} />
                            </div>
                            <GridItem data={showMVC} />
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}
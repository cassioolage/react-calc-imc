import { Level } from "../../helpers/imc";
import up from '../../assets/up.png';
import down from '../../assets/down.png';

type Props = {
    data: Level
}
export const GridItem = ({data}:Props) => {
    return (
        <div className="flex-1 flex text-white rounded-xl justify-center items-center flex-col p-5" style={{backgroundColor: data.color}}>
            <div className="w-[70px] h-[70px] rounded-full bg-gray-900 bg-opacity-10 flex justify-center items-center">
                <img src={data.icon === "up" ? up : down} alt={data.icon} width={30}/>
            </div>
            <div className="text-xl font-bold mt-1">
                {data.title}
            </div>
            {
            data.yourIMC && (
                <div className="text-[17px] mt-2 mb-12">Seu IMC é de {data.yourIMC} mg/m²</div>
            )
            }
            <div className="text-[12px] mt-3">
                <>
                    IMC está entre <strong>{data.imc[0]}</strong> e <strong>{data.imc[1]}</strong>
                </>
            </div>
        </div>
    )
}
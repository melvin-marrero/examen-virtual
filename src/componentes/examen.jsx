import { useState } from "react"
import { data, } from "../preguntas/pregunta"
import { data2 } from "../preguntas/pregunta_V_o_F";

export function Examen() {
    const [pregunta,setPregunta]=useState(data);
    const [pregunta2,setPregunta2]=useState(data2);
    const [total,setTotal]=useState(0);
    const [enviado,setEnviado]=useState(false);
    const answers = ["q1-a", "q2-b", "q3-c", "q4-a", "q5-b"];
    const answers_v_f = ["q1-V", "q2-F", "q3-V", "q4-V", "q5-F"];

    function hanldeChange({target}){
       const nextState=pregunta.map((pregunt)=>{
        if(pregunt.name !== target.name){
          return pregunt;
        }
        return {
          ...pregunt,
          options: pregunt.options.map((opt)=>{
           const checked = opt.radioValue===target.value;
           return {
            ...opt,
            selected:checked,
           };
          }),
          preguntaActual:target.value,
        };
       });
       setPregunta(nextState)
    }
    function hanldeChange2({target}){
      const nextState=pregunta2.map((pregunt2)=>{
       if(pregunt2.name !== target.name){
         return pregunt2;
       }
       return {
         ...pregunt2,
         options: pregunt2.options.map((opt)=>{
          const checked = opt.radioValue===target.value;
          return {
           ...opt,
           selected:checked,
          };
         }),
         preguntaActual:target.value,
       };
      });
      setPregunta2(nextState)
   }
    function onsubmit(e){
       e.preventDefault()
      let counter=0;
      let flag=false;
      for (const [index,pregunt] of pregunta.entries()){
        if(!pregunt.preguntaActual){
          flag=true
          alert("por favor responde ala pregunta #"+ (index+1))
          break;
        }else {
          if(pregunt.preguntaActual === answers[index]){
            counter++;
          }
        }
       
      }
      for (const [index2,pregunt2] of pregunta2.entries()){
        if(!pregunt2.preguntaActual){
          flag=true
          alert("por favor responde ala pregunta de falso o verdadero #"+ (index2+1))
          break;
        }else {
          if(pregunt2.preguntaActual === answers_v_f[index2]){
            counter++;
          }
        }
       
      }
      if(!flag){
        setTotal(counter)
        setEnviado(true)
        alert("enviado..")
      }
     
    }
  return (
    <div className="container">
       <h1>examen final de desarrollo web</h1> 
       <hr />
      <p>selecciona la repuesta correcta valor (5) punto</p>
      <section>
        {enviado && (
          <div className="resultado">
            <h3>obtuviste {total} de {10} puntos</h3>
          </div>
        )}
        <form action="" onsubmit={onsubmit}>
            {
              pregunta.map((pregunt,index)=>{
                return (
                    <div key={`group-${index}`}>
                      <h3>
                        {index +1}. {pregunt.preguntaText}
                      </h3>
                      {pregunt.options.map((optio,idx)=>{
                        return (
                          <div key={`optio-${idx}`}>
                            <input type="radio" 
                            name={pregunt.name} 
                            value={optio.radioValue}
                            checked={optio.selected}
                            onChange={hanldeChange}/>
                            {optio.choice}
                          </div>
                        )
                      })}
                    </div>
                  )  
                })
            }
            <p>selecciona falso o verdadero valor (5) punto</p>
            {pregunta2.map((pregunt2,index2)=>{
                return (
                    <div key={`group-${index2}`}>
                      <h3>
                        {index2 +1}. {pregunt2.preguntaText}
                      </h3>
                      {pregunt2.options.map((optio,idx2)=>{
                        return (
                          <div key={`optio-${idx2}`}>
                            <input type="radio" 
                            name={pregunt2.name} 
                            value={optio.radioValue}
                            checked={optio.selected}
                            onChange={hanldeChange2}/>
                            {optio.choice}
                          </div>
                        )
                      })}
                    </div>
                  )  
                })}
                {enviado===false ? 
                (<button className="btn" onClick={onsubmit}>enviar</button>):
                <p>examen enviado.....</p>
                }
                
            
        </form>
      </section>
    </div>
  )
}

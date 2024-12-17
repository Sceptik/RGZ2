import { wrapper } from '../../store';
import { setMessage } from '../../store';
import { Headers } from "../../components/Header/Headers";
import Inputarea from '../../components/Inputarea/Inputarea';
import { useState, useEffect} from 'react';
import style from "../styles/Home/Home.module.css"
import MenuInput from '../../components/MenuInput/MenuInput';
import OutputArea from '../../components/OutputArea/OutputArea';
import { useRouter } from 'next/router';

const Index = () => {
  const [code, setCode] = useState("print(\"Hello world\")\n");
  const [data,setData] = useState("");
  const router = useRouter();
  const router2 = useRouter();
  const {description, output} = router.query; 

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isAuth') === 'false') {
      router.push("/Login/")
  }
    }, []);

  async function handleSubmit(code) {
    console.log("Submitting code:", code);
    try {
        const response = await fetch('http://127.0.0.1:8000/compile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });
        if (!response.ok) {
          const datt = await response.json();
          setData(datt.error);
          <div>КОД НЕ РАБОТАЕТ</div>
        }
        else{
          const dat = await response.json();
          console.log('Server response:', dat);
          setData(dat.output);
        }
        
    } catch (error) {
        console.error('Error submitting code:', error);
    }
}

async function handlePass(){

  try {
    const response = await fetch('http://127.0.0.1:8000/create_task/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
    });
    if (response.ok) {
      router.push('/dashBoard/')
    }
    else{
      const dt = await response.json();
      console.log('Server response:', dt.error);
    }
    
    } catch (error) {
        console.error('Error submitting code:', error);
    }
}

  return (
    <div className="backround__item">
        <Headers />
        <div className={style.align_block__main}>
        <section className={style.input__section}>
          <MenuInput handleSubmit={handleSubmit} code={code} setCode={setCode}></MenuInput>
          <span style={{display:"flex", marginBottom:"25px", whiteSpace:"nowrap", border:"1px solid #000", background:"#fff",justifyContent:"center",alignItems:"center",width:"130px",height:"90px",borderRadius:"20px"}}>{description}</span>
          <Inputarea value={code} onChange={setCode}/>
          <OutputArea response={data}></OutputArea>
          {data === output ? <button style={{display:"flex", marginTop:"25px",justifyContent:"center",width:"120px",alignItems:"center",height:"190px",background:"green",cursor:"pointer",borderRadius:"20px"}} onClick={handlePass}>Сдать</button>:''}
        </section>
      </div>
    </div>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const fetchedMessage = 'Hello from Server Side!';
    store.dispatch(setMessage(fetchedMessage));

    return {
      props: {
        message: fetchedMessage,
      },
    };
  }
);

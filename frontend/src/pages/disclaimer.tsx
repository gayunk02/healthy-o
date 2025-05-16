import { useState } from "react";
import { useRouter } from "next/router";

export default function DisclaimerPage() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleConfirm = () => {
    if (input === "동의합니다") {
      localStorage.setItem("consent", "true");
      router.push("/question");
    } else {
      alert("입력창에 정확히 '동의합니다'라고 입력해 주세요.");
    }
  };

  const handleCancel = () => {
    alert("서비스 이용을 위해 동의가 필요합니다.");
    router.push("/");
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2 style={{color:"red", fontSize:"50px"}}>📄 서비스 이용 전 고지사항</h2>
      <p style={{fontSize:"20px"}}>

      본 서비스는 OpenAI의 생성형 인공지능(chatGPT) 기술을 기반으로, 
      <br></br>
      사용자가 입력한 데이터를 바탕으로 참고용 검색 결과를 제공하는 AI 통합 정보 검색 도구입니다.
      <br></br>
      <br></br>
      본 서비스는 의료법상 의료기관이 아니며, 또한 의료인(의사, 약사, 간호사 등) 및 의료 면허를 가진
      <br></br>
      전문가에 의해 운영되지 않습니다. 따라서 본 서비스가 제공하는 정보는 의학적 진단, 치료, 예방, 처방을 위한 
      <br></br>
      조언이나 의료행위에 해당하지 않습니다. 본 서비스에서 제공하는 결과는 전문적인 의료 상담이나 진료를 대체할 수 없으며 단순 결과를 제공하는 통합 검색 서비스 입니다.
      <br></br>
      <br></br>
      AI가 제시하는 정보는 일반적인 지식과 인공지능의 학습 결과를 기반으로 자동 생성된 것이며, 
      <br></br>
      개별 사용자에 맞춘 정확한 의학적 판단을 제공할 수 없습니다.
      <br></br>
      <br></br>
      본 서비스에서 제공되는 정보는 의료 서비스나 의료 전문가의 진료 및 진단을 대체할 수 없습니다.
      <br></br>
      사용자는 본 서비스를 통해 제공되는 정보를 단순 참고 자료로만 활용해야 하며, 건강상 우려가 있을 경우
      <br></br>
      반드시 자격 있는 의료 전문가와 상담하거나 의료기관을 직접 방문하여 진료를 받으시기 바랍니다.
      <br></br>
      <br></br>
      본 서비스는 AI 기술의 한계로 인해 부정확하거나 오해의 소지가 있는 정보가 포함될 수 있습니다.
      <br></br>
      제공된 정보를 기반으로 사용자가 내린 건강, 의료, 생활 등과 관련한 판단이나 행동의 결과에 대해 
      <br></br>
      본 서비스는 그 어떠한 법적·의료적 책임도 지지 않습니다.
      <br></br>
      <br></br>
      또한, 본 서비스에서 추천하는 병원, 의료기관, 건강기능식품은 일반적인 정보 제공을 위한 것이며,
      <br></br>
      특정 의료기관 또는 제품의 효능, 적합성, 안전성을 보장하거나 권장하는 것이 아닙니다.
      <br></br>
      건강기능식품의 경우 본 결과는 참고만 할 뿐, 관련 기관 및 전문가와 상의 후 복용하시길 바랍니다.
      <br></br>
      <br></br>
      정확하고 안전한 건강 관리를 위해서는 반드시 의료 전문가의 진단과 조언을 따르시길 바랍니다.

      </p>

      <div style={{ marginTop:"50px", marginBottom:"50px", height:"1px", backgroundColor:"#ccc", width:"100%"}}>
        
      </div>

      <p style={{ lineHeight:"70px", fontWeight: "bold", fontSize:"22px" }}>
        본 서비스는 의료 서비스가 아닌 chat GPT AI 기반 통합 검색 서비스임을 인지하였으며,
        <br></br>
        발생하는 피해에 본 서비스는 책임을 지지 않는 것 외 위 사항을 제대로 숙지하였다면 
        <br></br>
        서비스 이용을 위해 아래 입력창에  <span style={{ color: "red", fontSize: "27px"}}>동의합니다</span>  를 정확히 입력해 주세요.
      </p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="동의합니다"
        style={{ marginTop: "10px", padding: "10px", width: "200px", textAlign: "center", borderRadius:"5px" }}
      />

      <div style={{ marginTop: "30px" }}>
        <button onClick={handleConfirm} style={{ marginRight: "20px" }}>
          동의
        </button>
        <button onClick={handleCancel}>비동의</button>
      </div>
    </div>
  );
}

// // 사용자 동의, 비동의 창

// import { useRouter } from "next/router";

// export default function Home(){
//     const router = useRouter();

//     return(
//         <div>
//             <h1>서비스 이용 전 주의 사항</h1>
//             <div>
//                 쌸라쌸라
//             </div>
//             <button>위 주의 사항을 제대로 숙지하였고, 본 서비스는 의료 서비스가 아닌 통합 검색 서비스임을 인지하였으며 발생하는 피해에 본 서비스는 책임을 지지 않음을 확인하였기에 이 서비스 이용에 동의합니다.</button>
//             <button>동의하지 않습니다.</button>
//         </div>
//     )
// }
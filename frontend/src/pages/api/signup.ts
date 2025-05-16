//회원가입 테스트용 임시 API

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const { email, name, password, phone, gender } = req.body;

    console.log("받은 회원가입 정보:", { email, name, password, phone, gender });

    // 실제 백엔드 연동 전, 그냥 응답만 보내줌
    res.status(200).json({
      message: `${name}님, 회원가입 정보가 정상적으로 수신되었습니다!`,
    });
  } else {
    res.status(405).json({ message: "허용되지 않은 요청 방식입니다." });
  }
}

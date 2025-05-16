// 문진표페이지 테스트용 임시 API

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const { name, age, gender, status } = req.body;

    console.log("받은 문진표 정보:", { name, age, gender, status });

    res.status(200).json({
      message: `${name}님의 문진 정보가 정상적으로 수신되었습니다.`,
    });
  } else {
    res.status(405).json({ message: "허용되지 않은 요청 방식입니다." });
  }
}

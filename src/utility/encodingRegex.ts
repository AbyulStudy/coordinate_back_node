const flag = "gi";

const sharedRegex = {
  utfRegex: { korean: new RegExp(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, flag) },
  isoRegex: { korean: new RegExp(/[ƀ-ɏ]/, flag) }
};

const sharedFrequency = {
  utfFrequency: {
    korean: { low: 0.01091, high: 0.01367 }
  },
  isoFrequency: {
    korean: { low: 0.004118, high: 0.004961 }
  }
};
const { utfRegex, isoRegex } = sharedRegex;
const { utfFrequency, isoFrequency } = sharedFrequency;
/**
 * utf-8로 인코딩 이후 정규표현식으로 검사 해야합니다.
 */
export const encodingRegx = [
  {
    name: "korea",
    count: 0,
    utfRegex: utfRegex.korean,
    isoRegex: isoRegex.korean,
    encoding: "EUC-KR",
    utfFrequency: utfFrequency.korean,
    isoFrequency: isoFrequency.korean
  }
];

/**
 * euc-kr, utf-8(BOM), utf-8 기준으로 작성된 코드입니다.
 * euc-kr에 영문만 작성 되어 있을 경우 영문으로 작성되어 있을 경우 영문 그대로 출력 되기 때문에 정규표현식에 걸리지 않습니다. true 값을 반환하여 오작동이 일어납니다.
 * 반드시 한글이 작성되어 있어야만 euc-kr로 정상작동 합니다.
 * @description 영문만 작성되어 있을 경우 utf-8로 디코딩해도 정상 출력이 됩니다. 하지만 encoding Type을 출력하기 위해서는 반드시 한글이 작성 되어 있어야 합니다.
 * @example
 * const utfContent = "utf-8 Content".toString("utf-8");
 * checkUTF(utfContent);
 * @param utfContent utf-8로 디코딩된 string입니다.
 * @returns {boolean} boolean
 */
export const checkUTF = (utfContent: string) => {
  if (/�/.test(utfContent)) {
    return false;
  }

  return true;
};

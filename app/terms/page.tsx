import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '이용약관',
    description: '인생 치트키의 이용약관입니다.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black mb-8">이용약관</h1>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">제1조 (목적)</h2>
                        <p>
                            본 약관은 인생 치트키(이하 "사이트")가 제공하는 모든 서비스(이하 "서비스")의
                            이용조건 및 절차, 이용자와 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을
                            규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">제2조 (정의)</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>
                                <strong>"사이트"</strong>란 인생 치트키가 재화 또는 용역을 이용자에게 제공하기 위하여
                                컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한
                                가상의 영업장을 말합니다.
                            </li>
                            <li>
                                <strong>"이용자"</strong>란 사이트에 접속하여 본 약관에 따라 사이트가 제공하는
                                서비스를 받는 회원 및 비회원을 말합니다.
                            </li>
                            <li>
                                <strong>"서비스"</strong>란 대출 계산기, 점심 메뉴 추천, AI 작가 등 사이트가 제공하는
                                모든 도구 및 콘텐츠를 의미합니다.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">제3조 (약관의 명시와 개정)</h2>
                        <p className="mb-4">
                            사이트는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
                        </p>
                        <p>
                            사이트는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며,
                            약관이 변경되는 경우 변경사항을 시행일자 7일 전부터 공지합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">제4조 (서비스의 제공)</h2>
                        <p className="mb-4">사이트는 다음과 같은 서비스를 제공합니다:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>대출 이자 계산 서비스</li>
                            <li>월급 실수령액 계산 서비스</li>
                            <li>점심 메뉴 추천 서비스</li>
                            <li>AI 기반 텍스트 생성 서비스</li>
                            <li>기타 생활 편의 도구</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">제5조 (서비스의 중단)</h2>
                        <p className="mb-4">
                            사이트는 다음 각 호에 해당하는 경우 서비스 제공을 일시적으로 중단할 수 있습니다:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우</li>
                            <li>서비스를 위한 설비의 보수 등 공사로 인해 부득이한 경우</li>
                            <li>기타 불가항력적 사유가 있는 경우</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">제6조 (이용자의 의무)</h2>
                        <p className="mb-4">이용자는 다음 행위를 하여서는 안 됩니다:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>타인의 정보 도용</li>
                            <li>사이트에 게시된 정보의 변경</li>
                            <li>사이트가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                            <li>사이트의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위</li>
                            <li>공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형, 음향, 동영상을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">제7조 (면책조항)</h2>
                        <p className="mb-4">
                            사이트는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로 인하여
                            이용자에게 발생한 손해에 대해서는 책임을 부담하지 않습니다:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우</li>
                            <li>서비스용 설비의 보수, 정기점검, 교체 등 부득이한 사유로 발생한 손해</li>
                            <li>이용자의 귀책사유로 인한 서비스 이용의 장애</li>
                        </ul>
                        <p className="mt-4">
                            사이트가 제공하는 계산 결과는 참고용이며, 실제 금융 거래 시 발생하는 결과와
                            다를 수 있습니다. 중요한 금융 결정은 전문가와 상담하시기 바랍니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">제8조 (저작권의 귀속)</h2>
                        <p>
                            사이트가 작성한 저작물에 대한 저작권 기타 지적재산권은 사이트에 귀속합니다.
                            이용자는 사이트를 이용함으로써 얻은 정보 중 사이트에게 지적재산권이 귀속된
                            정보를 사이트의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여
                            영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
                        </p>
                    </section>

                    <section className="border-t-2 border-black pt-8 mt-8">
                        <p className="text-sm text-gray-600">
                            시행일자: 2026년 1월 27일
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

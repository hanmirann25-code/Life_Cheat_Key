import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '개인정보 처리방침',
    description: '인생 치트키는 사용자의 개인정보를 소중하게 생각합니다. 서비스 이용과 관련된 개인정보 처리방침을 확인하세요.',
    openGraph: {
        title: '개인정보 처리방침 | 인생 치트키',
        description: '인생 치트키는 사용자의 개인정보를 소중하게 생각합니다. 서비스 이용과 관련된 개인정보 처리방침을 확인하세요.',
        url: 'https://life-cheat-key.com/privacy',
    },
    twitter: {
        card: 'summary_large_image',
        title: '개인정보 처리방침 | 인생 치트키',
        description: '인생 치트키는 사용자의 개인정보를 소중하게 생각합니다. 서비스 이용과 관련된 개인정보 처리방침을 확인하세요.',
    },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black mb-8">개인정보 처리방침</h1>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. 개인정보의 처리 목적</h2>
                        <p className="mb-4">
                            인생 치트키(이하 '사이트')는 다음의 목적을 위하여 개인정보를 처리합니다.
                            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
                            이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>서비스 제공 및 운영</li>
                            <li>사용자 문의 응대</li>
                            <li>서비스 개선 및 통계 분석</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. 개인정보의 처리 및 보유 기간</h2>
                        <p className="mb-4">
                            사이트는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
                            동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                        </p>
                        <p>
                            현재 본 사이트는 별도의 회원가입 절차가 없으며, 직접적인 개인정보를 수집하지 않습니다.
                            다만, '습관 형성 게임' 등 일부 서비스는 사용자의 편의를 위해 입력한 데이터를
                            브라우저의 로컬 스토리지(Local Storage)에 저장하며, 이는 서버로 전송되지 않습니다.
                            또한, 서비스 이용 과정에서 자동으로 생성되는 쿠키 및 로그 정보는 서비스 개선을 위해
                            일시적으로 수집될 수 있습니다.

                            또한, 본 사이트는 구글 애드센스(Google AdSense) 광고를 게재하고 있습니다.
                            이에 따라 광고 파트너인 구글(Google)과 제3자 벤더는 사용자의 사이트 방문 기록(쿠키)을 활용하여
                            맞춤형 광고를 제공할 수 있습니다.
                            <br /><br />
                            - 사용자는 구글의 광고 설정 페이지(www.google.com/settings/ads)에서 맞춤형 광고 설정을 해제할 수 있습니다.
                            - 제3자 벤더의 웹사이트를 방문하여 쿠키 사용을 거부할 수도 있습니다. (www.aboutads.info 참조)
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. 정보주체의 권리·의무 및 그 행사방법</h2>
                        <p className="mb-4">
                            정보주체는 사이트에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>개인정보 열람 요구</li>
                            <li>오류 등이 있을 경우 정정 요구</li>
                            <li>삭제 요구</li>
                            <li>처리정지 요구</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. 개인정보의 파기</h2>
                        <p>
                            사이트는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
                            지체없이 해당 개인정보를 파기합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. 개인정보 보호책임자</h2>
                        <p className="mb-4">
                            사이트는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                            개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
                            아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                        </p>
                        <div className="bg-gray-100 p-4 rounded border-2 border-black">
                            <p className="font-bold">개인정보 보호책임자</p>
                            <p>이메일: miran2252@naver.com</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. 개인정보 처리방침 변경</h2>
                        <p>
                            이 개인정보 처리방침은 2026년 1월 27일부터 적용됩니다.
                            법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는
                            변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
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

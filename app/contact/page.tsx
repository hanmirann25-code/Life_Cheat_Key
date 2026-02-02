import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '연락처 (문의/제안/제휴)',
    description: '인생 치트키 서비스 이용 중 문의사항, 버그 리포트, 기능 제안, 제휴 문의가 있으신가요? 언제든지 연락 주세요.',
    openGraph: {
        title: '연락처 (문의/제안/제휴) | 인생 치트키',
        description: '인생 치트키 서비스 이용 중 문의사항, 버그 리포트, 기능 제안, 제휴 문의가 있으신가요? 언제든지 연락 주세요.',
        url: 'https://life-cheat-key.com/contact',
    },
    twitter: {
        card: 'summary_large_image',
        title: '연락처 (문의/제안/제휴) | 인생 치트키',
        description: '인생 치트키 서비스 이용 중 문의사항, 버그 리포트, 기능 제안, 제휴 문의가 있으신가요? 언제든지 연락 주세요.',
    },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black mb-8">연락처</h1>

                <div className="space-y-8">
                    <section className="bg-neon-yellow border-4 border-black p-8">
                        <h2 className="text-2xl font-bold mb-4">📧 이메일로 문의하기</h2>
                        <p className="text-lg mb-4">
                            서비스 이용 중 문의사항, 버그 리포트, 기능 제안 등
                            언제든지 연락 주세요!
                        </p>
                        <div className="bg-white border-2 border-black p-4 inline-block">
                            <p className="font-bold text-xl">miran2252@naver.com</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">💬 자주 묻는 질문</h2>
                        <div className="space-y-4">
                            <div className="border-2 border-black p-4">
                                <h3 className="font-bold mb-2">Q. 서비스는 무료인가요?</h3>
                                <p className="text-gray-700">
                                    A. 네! 인생 치트키의 모든 서비스는 무료로 제공됩니다.
                                </p>
                            </div>

                            <div className="border-2 border-black p-4">
                                <h3 className="font-bold mb-2">Q. 회원가입이 필요한가요?</h3>
                                <p className="text-gray-700">
                                    A. 아니요. 별도의 회원가입 없이 모든 기능을 바로 사용하실 수 있습니다.
                                </p>
                            </div>

                            <div className="border-2 border-black p-4">
                                <h3 className="font-bold mb-2">Q. 계산 결과는 정확한가요?</h3>
                                <p className="text-gray-700">
                                    A. 계산 결과는 참고용이며, 실제 금융 거래 시 발생하는 결과와 다를 수 있습니다.
                                    중요한 금융 결정은 전문가와 상담하시기 바랍니다.
                                </p>
                            </div>

                            <div className="border-2 border-black p-4">
                                <h3 className="font-bold mb-2">Q. 새로운 기능을 제안하고 싶어요!</h3>
                                <p className="text-gray-700">
                                    A. 환영합니다! 위의 이메일로 제안사항을 보내주시면 검토 후 반영하도록 하겠습니다.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">🤝 협업 문의</h2>
                        <p className="text-gray-700 mb-4">
                            광고 문의, 제휴 제안, 기타 비즈니스 관련 문의는 아래 이메일로 연락 주세요.
                        </p>
                        <div className="bg-gray-100 border-2 border-black p-4 inline-block">
                            <p className="font-bold">miran2252@naver.com</p>
                        </div>
                    </section>

                    <section className="bg-neon-pink border-4 border-black p-8">
                        <h2 className="text-2xl font-bold mb-4">⚠️ 주의사항</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>이메일 답변은 영업일 기준 1-3일 정도 소요될 수 있습니다.</li>
                            <li>스팸성 메일이나 광고성 메일은 답변하지 않습니다.</li>
                            <li>개인정보가 포함된 내용은 신중하게 작성해 주세요.</li>
                        </ul>
                    </section>

                    <section className="text-center pt-8">
                        <p className="text-lg font-medium text-gray-700">
                            인생 치트키를 이용해 주셔서 감사합니다! 🙏
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

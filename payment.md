# Payment
- payment is the transfer of money or goods and services in exchange for a product or service
- payments are typically made after the terms have been agreed upon by all parties involved
- a payment can be made in the form of cash, check, wire transfer, credit card, or debit card
---




# VAN & PG
- App to App service의 등장에 따라 점점 쇠퇴해가는 카드결제 system
- VAN(Value-Added Network)사
	- 카드사와 가맹점 간의 network를 구축해서 소비자의 카드 사용 승인을 가맹점과 카드사 사이에서 중개해주는 역할
	- 예시 : 카페에 가서 5,000원 짜리 음료를 먹기 위해 BC 카드로 결제
		1. 우리는 카드를 종업원에게 건네고 종업원은 5,000원이라는 금액을 카드기(POS)에 긁음
		2. 카드 정보가 VAN사로 전송됨
		3. VAN사는 BC에 '우리가 5,000원을 결제한다'는 사실에 대한 승인 여부를 요청
		4. BC사에서는 우리의 카드에 잔액이 충분한지, 신용 정보가 올바른지 등을 판단하여 VAN사에 승인을 내리거나 거부를 함
		5. VAN사는 승인 내역을 카드기(POS)에 송신
		6. 결제가 완료되면 전표가 줄력되고 우리는 영수증을 받음
	- 카드사에서 직접 가맹점과 거래하지 않고 중간에 VAN사가 개입하는 이유
		- 전표는 가맹점과 카드사 간의 거래를 번거롭게 함
			- 가맹점은 전표를 카드사에 가져가서 확인받아야 그에 맞는 대금을 받을 수 있음
			- 가맹점은 매장에서 상용하는 수많은 카드사에 직접 방문하기 어려우며, 카드사 역시 모든 가맹점을 대상으로 전표 거래를 진행하기엔 업무가 많아짐
		- 따라서, VAN사는 카드사를 대신하여 가맹점의 카드 전표 내역에 따라 대리 지급을 하고, 그에 대한 수수료를 카드사로부터 제공받음
		- VAN사는 가맹점 전표에 대한 대금 결제를 해주는 댓가로 카드사로부터 수수료를 받고, 가맹점은 모든 카드사를 직접 방문하지 않고 VAN사를 통해 그 결제 금액을 받을 수 있음
		- 이로써, 카드사 역시 원활하게 고객의 소비에 따라 책정된 카드 수수료를 납부받을 수 있음
	- 한국 정보통신, Nice 정보통신, KSNET, SMARTRO, KIS 정보통신 등이 있음
	- VAN사 선정 기준
		- VAN사는 보통 가맹점에 'rebate'를 권유하며 매장과의 계약을 따내고, 이를 통해 가맹점 역시 VAN사가 일부 챙겨간 수수료 중 일부를 다시 돌려받을 수 있음
			- rebate : 지불한 돈 일부를 돌려받는 것 (a return of a part of a payment)
			1. 우리는 5,000원 짜리 커피를 신용카드로 구매
			2. 카드사는 5,000원 중 일정율의 수수료를 가져감
			3. VAN사는 그 일정 수수료 중 다시 또 일정 수수료를 가져감
			4. 가맹점은 다시 그 일정 수수료의 일부를 rebate 받음
- PG(Payment Gateway)사
	- VAN사의 업무를 online으로 대행하는 것
		- online 결제시 단말기 없이 진행되는 과정에서 VAN사의 역할을 대신 수행하여 카드사와 소비자가 이어질 수 있도록 만드는 부가적인 option
	- online shoppingmall이 등장하면서 '단말기'에 대한 부분을 어떻게 수행해야할지 난점이 생김
		- 항상 카드를 사용하면 단말기로 결제를 했고, 그 단말기에서 출력된 전표를 바탕으로 VAN이라는 system이 운영되어옴
		- 그러나 online shoppingmall은 소비자가 단말기를 사용할 수 없음
		- 그래서 PG라는 model이 등장
	- 예시 : online shoppingmall에서 20,000원 짜리 서적을 구매하기 위해 BC 카드 사용
		1. online shoppingmall에서 '신용카드 또는 체크카드 결제'를 click
		2. 결제 인증을 위한 '개인 정보' 및 '카드 정보'에 관한 과정을 진행
		3. 그럼 PG사에서 나의 정보를 받고 정리하여 VAN사로 결제에 대한 승인 요청을 함
		4. VAN사에서는 그대로 카드 정보를 BC에 '내가 20,000원을 결제한다'는 사실에 대한 승인 여부를 요청
		5. BC 카드사에서는 카드 잔액이 충분한지, 신용 정보가 올바른지 등을 판단하여 VAN사에 승인을 내리거나 거부함
		6. VAN사는 BC 카드사에서 내려온 사안을 그대로 PG사에 전달
		7. PG사는 여기서 승인 결과를 나, 그리고 shoppingmall에 통보
		8. shoppingmall은 승인 결과를 확인하고 나에게 서적을 보냄
	- PG사 역시 VAN사처럼 '수수료'를 통한 수익을 business model로 하고 있음
		- 또한 rebate를 통해 가맹주들에 의해 선별됨
	- PAYGATE, INICIS 등이 있음
- VAN vs PG
	- offline 카드 결제 : 가맹점 <-> VAN사 <-> 카드사
	- online 카드 결제 : 가맹점 <-> PG사 <-> VAN사 <-> 카드사
---




# App to App 결제
- 구매가와 판매자 사이의 구조를 더욱 단순화한 service
- 기존에 있었던 PG사나 VAN사를 거치지 않고도 금융 기관과 직접적인 거래가 가능
	- 금융 기관(카드사, 은행 등)에서 직접 판매자과 구매자를 이어주고, 전표 시스템이나 online 결제 시스템을 간편하게 다룰 수 있음
	- app service를 통해 모든 거래 내역이 전송되고, 가맹점은 이에 대한 대금을 원활하게 받을 수 있음
	- 카드사는 PG사 및 VAN사로 지급해야했던 수수료를 절약할 수 있음
		- 가맹점에게 혜택(VAN사와 PG사의 rebate 개념)을 직접 줄 수 있게 됨
	- 카드사는 수수료를 지불하지 않기 때문에 더 많은 수익을 얻을 수 있고, 가맹점은 직접 카드사로부터 수수료 절감 혜택을 받을 수 있음
		- 서로 이익 (Win-Win 효과)
- 원래의 방식대로라면 고객이 online에서 카드를 사용하면 PG사와 VAN사를 거쳐 카드사와 고객, 그리고 가맹점 간의 network를 구축할 수 있었음
	- 그에 따라, 가맹점의 수수료 부담이 발생하고 PG사와 VAN사는 이 수수료를 받아서 rebate하는 형식으로 수익 구조가 만들어짐
	- 전표에 대한 문제나 online 결제의 무결성에서부터 이렇게 번거로운 구조가 만들어짐
---




# 인증 & 승인 & 매입
- 카드 결제라는 것은 'shoppingmall 가맹점의 주문서' -> '인증' -> '승인' -> '매입' 총 4가지 단계를 거침
- 인증
	- 카드 번호등의 정보를 입력하고 카드가 유효한지 확인하는 과정
	- 이 단계가 이용자들이 생각하는 결제기만 사실 인증 절차만으로는 아무런 결제도 이루어지지 않음
	- 인증 단계에서 '일반 결제'와 '간편 결제'가 나뉘어짐
		- 일반 결제
			- 우리가 일반 결제라고 생각하는 그 화면은 각 카드사에서 제공하는 인증 module임
			- 기본 인증 module에는 사람이 card 번호를 입력
		- 간편 결제
			- 일반 결제에서 인증 module에 사람이 직접 입력하던 카드 정보를 pay service가 대신 입력해주는 것
				- 우리는 이 과정을 간편 결제라고 부름
			- 카드 번호는 오로지 카드사만이 저장하고 있음
- 승인
	- PG 또는 VAN사를 통해 카드 발급사에 정보를 전달해서 카드 사용을 전달하고 카드 한도를 차감하는 과정
- 매입
	- 승인된 금액을 VAN사를 통해서 카드 매입사로 전달하는 확정 과정
---




# 신용카드 회사의 종류
- 매입사
- 발급사
---




# 전표란?
- 일정한 거래를 유형별로 기록하고 관리하기 위하여 회계거래에 대한 계정과목, 거래내용, 금액 등을 기대할 수 있도록 만든 서식
- 전표가 모이면 장부의 역할을 함
	- 따라서 회사에서는 기본적으로 전표를 가장 기본적인 자료로 이용
- 일반적으로 사용하는 전표로는 입금전표, 출금전표, 분개전표 등이 있음
---




# 전표 작성의 의의
- 장부기장이나 내부결재 목적으로 작성
	- 거래가 발생했을 경우, 전표를 작성해서 올바른 회계처리를 위한 기초자료로 사용
	- 또한 대표자나 경영진에게도 투명한 자금 집행을 위한 가장 중요한 자료
---




# 전표 작성의 효과
- 거래를 보다 신속하고 효율적으로 관리하기 위해 작성
1. 동시에 발생하는 많은 양의 거래를 거래의 각 담당 부서별로 분담하여 처리 가능
2. 책임 소재를 명확히 하여 장부검사의 수단으로 이용할 수 있음
3. 발생한 거래의 내용을 다른 부서에 쉽게 전달 가능
4. 전표를 분개장 대신에 사용할 수 있어 장부의 작성을 간소화할 수 있음
5. 전표의 집계표(일계표 도는 월계표)를 활용하여 전기(전표에서 장부로 옮겨 적는 것)의 횟수를 줄일 수 있
---




# 전표의 종류
- 입금 전표
	- 현금이 들어오는 거래를 기입하는 전표 (입금 거래)
	- 입금 전표의 차변은 항상 현금이므로 입금 전표 상의 계정 과목에는 대변 계정만 작성
	- 유의할 사항은 입금의 상대 계정 과목이 두 개이면 두 장의 전표를 작성해야 함
- 출금 전표
	- 현금이 지급되는 거래를 기입하는 전표 (출금 거래)
	- 출금 전표의 대변은 항상 현금이므로 출금 전표 상의 계정 과목에는 차변 계전만 작성
- 대체 전표
	- 대체 거래에 사용되는 전표
	- 현금의 입금과 출금의 변동이 없는 거래(대체 거래)와 두 개 이상의 거래가 복합된 경우(기타 거래)에 사용하는 전표
	- 차변의 금액과 계정 과목 항목에는 거래를 분개한 내용 중 차변 계정 과목과 금액을 기입
- 분개 전표
	- 거래 내용을 보통 분개장과 같은 형식으로 기입할 수 있도록 고안된 전표
	- 차변의 계정 과목과 금액란에는 거래를 분개한 내용 중 대변 차변 계정 과목과 금액을 기입
	- 분개 전표는 일정기간 동안의 거래 내용을 요악, 정리한 표임
---




# Fintech
- Financial Technology
- 금융(Finance) + 기술(Technology)
- mobile, big data, SNS 등의 첨단 정보 기술을 기반으로 한 금융 service 및 산업의 변화를 통칭
- mobile을 통한 결제/송금/자산관리/crowdfunding 등 금융과 IT가 융합된 것
- 새로운 IT 기술을 활용하여 기존 금융기법과 차별화된 금융 service를 제공하는 기술기반 service 혁신이 대표적
	- ex) Mobile banking, APP card
- 혁신적 비금융기업이 보유 기술을 활용하여 지급결제과 같은 금융 service를 이용자에게 직접 제공하기도 함
	- ex) Apple Pay, Alipay
---




# Fintech 업종
- 지불 및 송금 : ID를 확인하고 돈을 저축하는 계좌(ex. 은행 계좌), 돈 예금 및 인출 도구(ex. 수표 및 직불 card) 및 다른 당사자 간에 안전하게 돈을 교환하기 위한 system(ex. ACH)
- 창비 및 대출 : 예금자로부터 돈을 모으로 차용인에게 신용을 제공하느 소비자 기관(ex. 신용 card, mortgage, 자동차 대출)
- 자산 관리 : 금융 투자(ex. 주식 시장에 투자) 및 은퇴 및 부동산 계획(ex. 연금)과 관련된 거래에 조언을 제공하고 실행하는 고문, 중개인 및 투자 관리자
- 보험 : 생명 보험뿐만 아니라 손해 보험(ex. 자동차 보험, 주택 소유자 보험, 건강 보험)
- 통화 : 국가의 가치가 뒷받침되는 상점, 계정 단위 및 교환 매체(ex. 미국 dollar, sterling, euro)
---




# What is a Fintach company?
- Fintech companies integrate technologies (like AI, blockchain and data science) into traditional financial sectors to make them safer, faster and more efficient
- Fintech is one of the fastest-growing tech sectors, with companies innovating in almost every area of finance (from payments and loans to credit scoring and stock trading)
---




# References





References
- https://www.investopedia.com/terms/p/payment.asp
	- payment의 정의
- https://finance3.tistory.com/34?category=779493
	- VAN
- https://finance3.tistory.com/43
	- PG
- https://finance3.tistory.com/53?category=779493
	- App to App
- http://www.yesform.com/cnts_mgzn/%B0%C5%B7%A1%B8%A6+%B1%E2%B7%CF%C7%CF%B0%ED+%B0%FC%B8%AE%C7%CF%B1%E2+%C0%A7%C7%D1+%B9%AE%BC%AD%2C+%C0%FC%C7%A5-86/
	- 전표
- https://brunch.co.kr/@windydog/101
	- 인증 & 승인 & 매입
- https://builtin.com/fintech
	- fintech
- https://ko.wikipedia.org/wiki/%ED%95%80%ED%85%8C%ED%81%AC
	- fintech

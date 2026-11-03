// 포트폴리오에 보이는 내용은 이 파일만 고치면 된다.
// '회사/기관명', '프로젝트 이름'처럼 자리표시자로 남겨 둔 항목을 본인의 내용으로 바꾸세요.

export type Link = { label: string; href: string }

export type Experience = {
  organization: string
  role: string
  period: string
  bullets: string[]
}

export type Troubleshooting = {
  title: string
  content: string
}

export type TimelineItem = {
  period: string
  title: string
  description?: string
}

/** 프로젝트 목록 페이지는 이 순서대로 분야별 섹션을 보여준다. 프로젝트가 없는 분야는 숨겨진다 */
export const projectCategories = [
  { id: 'ai', label: 'AI' },
  { id: 'art-tech', label: 'Art-Tech' },
  { id: 'game', label: 'Game' },
] as const

export type ProjectCategory = (typeof projectCategories)[number]['id']

export type Project = {
  /** 프로젝트를 구분하는 고유한 영문 식별자 */
  slug: string
  title: string
  /** 목록 페이지에서 이 프로젝트가 들어갈 분야 섹션 */
  category: ProjectCategory
  period: string
  /** 인원 구성. 예: "개인 프로젝트", "4인 팀 프로젝트" */
  team: string
  /** 팀 프로젝트에서 내가 맡은 역할 */
  role: string
  /** 목록/카드에 쓰이는 한 줄~두 문장 요약 */
  description: string
  /** 어떤 문제를 풀어야 했는지 */
  problem: string
  /** 그 문제를 어떻게 풀었는지 (내가 한 일 중심) */
  solution: string
  /** 결과. 가능하면 수치로 */
  result: string
  /** 상세 페이지에 보여줄 트러블슈팅 1~2개 */
  troubleshooting: Troubleshooting[]
  tags: string[]
  links: Link[]
  /** true면 홈 화면에도 노출된다 */
  featured?: boolean
}

export type SkillGroup = { category: string; items: string[] }

export const profile = {
  intro: [
    '서강대학교 아트&테크놀로지학과에서 융합소프트웨어를 함께 전공하며, AI를 활용한 서비스를 기획부터 개발까지 직접 만들어 왔습니다.',
    'AI 챗봇, 모바일 앱, 인터랙티브 아트와 퍼포먼스까지 여러 형태의 상호작용과 사용자 경험을 고민해 왔습니다. 기술을 먼저 정하기보다 사용자가 겪는 문제에서 출발해, 거기에 맞는 기술을 고르는 편입니다.',
    'AI를 제품에 녹여내는 소프트웨어 개발자를 목표로 하고 있습니다.',
  ],
  // 메인 페이지에 한두 줄로 노출되는 인턴/경력 요약. 빈 문자열이면 숨겨진다
  internshipSummary: '',
  // 이력서 PDF는 public/resume.pdf에 넣고 경로를 적는다. 빈 문자열이면 버튼이 숨겨진다
  resumeUrl: '',
  // 이메일은 mailto:주소 형태로 적는다. 빈 배열이면 연락처 영역이 숨겨진다
  contacts: [
    { label: 'GitHub', href: 'https://github.com/softee220' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/suim-kim-99535738b/' },
    { label: 'Email', href: 'mailto:happyvalley0112@gmail.com' },
  ] satisfies Link[],
}

export const experiences: Experience[] = [
  {
    organization: 'AIZ 엔터테인먼트',
    role: 'AI 개발팀 개발 인턴',
    period: '2026.01 – 2026.07',
    bullets: ['게임 챗봇 3종을 개발했습니다.'],
  },
  {
    organization: 'HATESLOP (서강대학교 생성형 AI 미디어&테크 학회)',
    role: '학회원',
    period: '2025.09 – 2026.01',
    bullets: [
      '생성형 AI 챗봇 〈내 친구가 환승연애 막내 PD?〉를 팀으로 기획·개발했습니다.',
      '파이널 프로젝트로 AI 전시 도슨트 앱 CURAT의 AI 채팅 기능을 개발했습니다.',
    ],
  },
]

export const projects: Project[] = [
  {
    slug: 'transit-love-pd-chatbot',
    title: '내 친구가 환승연애 막내 PD?',
    category: 'ai',
    // TODO: 실제 기간으로 바꿔주세요
    period: '2025.09 – 2025.12',
    team: '4인 팀 프로젝트',
    role: '기획 · AI 백엔드 개발 (감정 분석, RAG, 리포트)',
    description:
      '"환승연애" 막내 PD가 된 친구 캐릭터와 대화하며 연애 경험을 털어놓으면, AI가 전 연인에 대한 미련도를 5가지 심리 요소로 분석해 감정 리포트로 보여주는 생성형 AI 챗봇입니다. 감정 분석, RAG 기반 점수 정규화, 감정 이미지 매핑, 개인화 리포트 생성을 맡았습니다.',
    problem:
      '자유 대화형 챗봇만으로는 필요한 감정 신호를 안정적으로 모으기 어려웠고, 초기 키워드 기반 점수는 문맥이나 감정의 강도를 반영하지 못했습니다. "미련이 있다"를 막연하게 판단하지 않고, 근거를 설명할 수 있는 점수로 만드는 것이 핵심 과제였습니다.',
    solution:
      '미련도를 애착도(30%)·후회도(25%)·미해결감(20%)·비교 기준(15%)·회피/접근(10%) 5가지 요소로 나누고, 매 턴 키워드 기반 1차 점수를 계산해 대화 단계 전환에 활용했습니다. 리포트를 만들 때는 전체 대화 맥락을 임베딩해, 5-Factor 분석 결과와 함께 저장한 50개 이상의 이별 사례(ChromaDB)에서 코사인 유사도 상위 3개를 검색합니다. 이어서 GPT-4o-mini를 채점자(LLM-as-a-Grader)로 써서 사용자 답변, 초기 점수, 유사 사례의 점수와 근거를 함께 주고 요소별 점수를 JSON으로 다시 매기게 했습니다. 이 점수에 가중치를 적용한 종합 미련도와 누적 대화 맥락으로 PD 친구 말투의 5단계 맞춤 리포트를 생성하고, 챗봇 응답에는 6가지 감정 이미지를 키워드와 우선순위로 골라 붙였습니다.',
    result:
      'Flask 백엔드와 Vanilla JS 프론트엔드를 Docker로 묶어 배포하고, HateSlop 3기 프로젝트로 시연했습니다. 대화가 끝나면 미련도 리포트를 보여주고, 미련도 50점을 기준으로 맞는 연애 프로그램(환승연애 5, 러브캐처)을 추천하며, 리포트에 대한 반응이 부정적이면 다른 프로그램을 추천하는 흐름까지 구현했습니다.',
    troubleshooting: [
      {
        title: '키워드로는 읽히지 않는 감정, 파인튜닝 대신 RAG를 고른 이유',
        content:
          '초기 버전은 사전에 정의한 키워드로만 점수를 매겨, 문맥이나 감정의 강도를 반영하지 못했습니다. 파인튜닝은 새 사례가 생길 때마다 다시 학습해야 하고 왜 그 점수가 나왔는지 설명하기 어려웠습니다. 그래서 유사 사례를 검색해 LLM에게 비교 기준으로 주는 RAG 방식을 택했고, 점수와 함께 근거 문장을 생성하게 해 결과를 설명할 수 있게 만들었습니다.',
      },
      {
        title: '같은 감정 이미지만 반복되는 문제',
        content:
          '키워드 매칭을 if문으로 위에서부터 확인하다 보니, 흔한 감정의 키워드가 먼저 걸려 같은 이미지가 반복됐습니다. 단호한 조언·놀람처럼 드물고 특징이 뚜렷한 감정을 앞 순위에 두고 공감을 기본값으로 내렸으며, 감정별 키워드를 정제해 대화 흐름에 따라 다양한 이미지가 나오도록 조정했습니다.',
      },
    ],
    tags: ['Python', 'OpenAI API', 'Flask', 'RAG', 'ChromaDB', 'Vanilla JS', 'Docker'],
    links: [],
    featured: true,
  },
  {
    slug: 'curat',
    title: 'CURAT',
    category: 'ai',
    // TODO: 실제 기간으로 바꿔주세요
    period: '2025.12 – 2026.02',
    team: '3인 팀 프로젝트',
    role: 'AI 도슨트 채팅 개발 (FastAPI, RAG, Tavily)',
    description:
      'AI 기반 미술관 도슨트 모바일 앱입니다. 맞춤형 온보딩 후 AI 도슨트와 채팅하며 작품에 대해 질문하고, 작품 사진을 찍으면 CLIP으로 유사 작품을 찾아줍니다. HateSlop 3기 파이널 프로젝트로, AI 도슨트 채팅 기능을 맡았습니다.',
    problem:
      '전시장에서 작품에 대해 궁금한 점이 생겨도 바로 물어볼 곳이 없고, 오디오 가이드와 텍스트 설명은 연령대나 미술 지식 수준과 관계없이 모두에게 같은 내용을 제공합니다. AI 도슨트로 이를 풀려면 관람객 수준에 맞게 설명하면서도, LLM이 작품에 대해 없는 사실을 지어내지 않도록 막아야 했습니다.',
    solution:
      '모바일 앱이 질문과 함께 작품 ID, 연령대(Teen/Adult), 미술 전문성(Light/Medium/Deep)을 JSON으로 보내면, FastAPI 백엔드가 Supabase에서 작품 정보를 조회해 artwork_context를 만듭니다. 이후 두 단계 게이트를 거칩니다. 먼저 LLM이 DB 정보만으로 답할 수 있는지 YES/NO로만 판정해, 충분하면 외부 검색 없이 작품 정보만으로 답변합니다. 부족하면 질문이 작품·작가와 직접 이어지는 확장 질문(예: 작가의 다른 대표작)인지 한 번 더 판정하고, 그런 경우에만 Tavily로 웹 검색해 핵심 내용과 출처를 컨텍스트로 정리합니다. 최종 답변은 사용자 프로필에 따라 톤·길이·용어 난이도를 조절해 생성합니다.',
    result:
      'FastAPI 백엔드, 관람객용 모바일 앱(React Native·Expo), 관리자 웹(Next.js)을 모노레포로 함께 개발해 HateSlop 3기 파이널 프로젝트로 발표했습니다. 관람객은 전시 중 자유롭게 질문해 바로 답을 받고, 연령대와 이해 수준에 맞는 해설을 받으며, 전시별 채팅 세션으로 관람 흐름을 끊김 없이 이어갈 수 있습니다.',
    troubleshooting: [
      {
        title: '외부 검색을 언제 허용할 것인가',
        content:
          '항상 웹 검색을 붙이면 질문과 무관한 결과가 섞여 환각과 불필요한 호출이 늘고, 검색을 막으면 DB에 없는 확장 질문에 답하지 못합니다. 그래서 "DB만으로 충분한가"와 "작품·작가와 직접 연결된 질문인가"를 차례로 판정하는 이중 게이트를 두어, 꼭 필요한 경우에만 Tavily 검색을 허용했습니다.',
      },
      {
        title: 'DB 정보와 검색 결과가 서로 다를 때',
        content:
          '웹 검색 결과가 DB에 등록된 작품 정보와 다르게 말하는 경우가 생길 수 있었습니다. 프롬프트에 작품 정보가 항상 우선하고, 검색 결과를 쓸 때는 출처를 밝히며, 질문과 직접 관련 없는 내용은 덧붙이지 않는다는 규칙을 두어 답변의 근거를 일관되게 유지했습니다.',
      },
    ],
    tags: [
      'TypeScript',
      'React Native',
      'Expo',
      'FastAPI',
      'Supabase',
      'OpenAI',
      'CLIP',
      'Next.js',
    ],
    links: [],
    featured: true,
  },
  {
    slug: 'explainable-ai',
    title: '얼굴 감정 인식 모델 XAI 분석',
    category: 'ai',
    period: '2025.09 – 2025.12',
    team: '개인 프로젝트',
    role: '연구 설계 · 모델 학습 · 분석',
    description:
      'Explainable AI 수업 기말 프로젝트로, FER2013으로 학습한 ResNet18 감정 인식 모델이 얼굴의 어디를 보고 판단하는지 Grad-CAM, Integrated Gradients, LIME, RISE 네 가지 XAI 기법으로 분석하고, Deletion/Insertion 지표로 각 설명의 신뢰도를 정량 비교했습니다.',
    problem:
      'CNN 기반 표정 감정 인식(FER) 모델은 정확도는 높지만, 왜 그 감정으로 판단했는지 알 수 없는 블랙박스입니다. 정신 건강이나 감시처럼 민감한 분야에 쓰이는 만큼, 모델이 사람처럼 눈·입 같은 의미 있는 얼굴 단서를 보는지 배경 같은 우연한 상관관계에 기대는지 확인해야 했습니다. 게다가 XAI 기법마다 결과가 달라 하나의 기법만으로는 결론을 내리기 어려웠습니다.',
    solution:
      'ImageNet으로 사전학습된 ResNet18을 FER2013(48×48 흑백, 7개 감정)에 맞춰 파인튜닝하고, Captum으로 네 가지 기법을 구현했습니다. Grad-CAM은 마지막 합성곱 층의 기울기로 주목 영역을, Integrated Gradients는 검은 이미지에서 원본까지 기울기를 적분해 픽셀 단위 기여도를, LIME은 얼굴을 14×14 격자로 나눠 국소 선형 모델로 패치 중요도를, RISE는 무작위 마스크로 가린 이미지의 예측 확률로 영역 중요도를 구합니다. 한 샘플에 네 기법을 동시에 적용해 히트맵을 비교하는 분석 함수를 만들고, 중요한 픽셀부터 지우거나(Deletion) 채워 넣으며(Insertion) 예측 확률이 어떻게 변하는지 AUC로 측정해 각 설명이 모델의 실제 판단을 얼마나 반영하는지 평가했습니다.',
    result:
      '모델은 테스트 정확도 68.1%(검증 68.3%)를 기록했습니다. 네 기법 모두 눈·눈썹 등 윗얼굴 영역에 주목해, 모델이 심리학적으로 의미 있는 얼굴 단서를 사용한다는 가설을 뒷받침했습니다. angry로 분류된 샘플에서 Deletion은 RISE(AUC 0.097), Insertion은 LIME(0.602)과 Grad-CAM(0.572)이 가장 좋아, 예측에 꼭 필요한 영역과 예측을 되살리기에 충분한 영역을 짚는 기법이 서로 다르다는 점을 확인했습니다.',
    troubleshooting: [
      {
        title: '노이즈처럼 보였던 RISE가 가장 정확했던 이유',
        content:
          'RISE 히트맵은 점이 흩어져 있어 Grad-CAM에 비해 노이즈처럼 보였습니다. 하지만 원본 위에 겹쳐 보니 점들이 배경 없이 얼굴 안에만 모여 있었고, Deletion 실험에서는 네 기법 중 AUC가 가장 낮아 예측에 꼭 필요한 영역을 가장 정확히 짚는 것으로 나타났습니다. 설명이 그럴듯해 보이는지만으로 기법을 고르면 안 되고, 정량 지표로 함께 검증해야 한다는 점을 배웠습니다.',
      },
      {
        title: '48×48 흑백 이미지를 ImageNet 모델에 맞추기',
        content:
          'FER2013은 48×48 흑백 이미지인 반면, 사전학습된 ResNet18은 224×224 컬러 이미지를 기대합니다. 흑백 채널을 3채널로 복제하고 224×224로 업샘플링한 뒤 ImageNet 평균·표준편차로 정규화해 입력을 맞췄습니다. 히트맵을 원본 위에 겹쳐 보여줄 때는 정규화를 되돌리는 함수를 따로 만들어 얼굴이 제대로 보이게 했습니다.',
      },
    ],
    tags: ['PyTorch', 'Captum', 'XAI', 'Computer Vision'],
    links: [{ label: '보고서 PDF', href: '/projects/explainable-ai-report.pdf' }],
  },
  {
    slug: 'toast-out',
    title: 'TOAST OUT',
    category: 'art-tech',
    // TODO: 실제 기간으로 바꿔주세요
    period: '2026.03 – 2026.05',
    team: '3인 팀 프로젝트',
    role: '기획 · 개발',
    description:
      '번아웃 직전 상태(토스트 아웃)를 주제로 한 p5.js 내러티브 인터랙티브 아트입니다. 토스트 캐릭터가 번아웃에 빠졌다가 다시 일어서는 이야기를 7개 장면의 인터랙션으로 구현했습니다.',
    problem:
      '겉으로는 완벽해 보이는 아트앤테크놀로지 전공생들도 비교에서 오는 초라함, 한계에 대한 좌절, 누적된 피로로 번아웃을 겪습니다. 팀원과 동료 인터뷰에서 나온 이 세 가지 원인을 관객이 직접 조작하며 체감할 수 있는 인터랙션으로 옮기는 것이 과제였습니다.',
    solution:
      '이야기를 인트로 → 추락 → 내면의 말들 → 디멘터 → 번아웃 → 사다리 → 별똥별 7개 장면으로 나누고, 장면마다 입력 방식을 다르게 설계했습니다. 키 입력(keyPressed)으로 장면을 전환하고, 토스트를 클릭하면 배열에 저장된 부정적인 문장이 하나씩 나타나도록 isVisible 값으로 표시를 제어했습니다. 디멘터 장면에서는 무작위 위치·속도로 생성된 디멘터가 마우스 방향으로 조금씩 다가오고, 40px 안으로 들어오면 충돌로 판정해 짧은 글리치 효과와 함께 새 디멘터를 추가합니다. 번아웃 장면은 35장의 이미지를 5프레임마다 교체하는 시퀀스 애니메이션으로, 마지막 별똥별 장면은 random()으로 만든 유성의 이전 위치를 trail 배열에 저장하고 투명도를 낮춰 잔상을 표현했습니다.',
    result:
      '마우스 추적, 충돌 판정, 프레임 애니메이션, 잔상 효과 등 장면별 인터랙션 7개를 p5.js로 구현해 발표했습니다.',
    troubleshooting: [
      {
        title: '조작은 자유롭게, 이야기는 정해진 대로',
        content:
          '추락 장면에서 관객이 토스트를 움직일 수 있게 하면서도, 이야기상 토스트는 반드시 구멍에 빠져야 했습니다. 왼쪽에서 미는 힘을 오른쪽 이동 속도보다 크게 설정해 어떻게 조작해도 결국 떨어지도록 만들고, 구멍에 닿으면 rotate()로 회전시켜 떨어지는 순간을 강조했습니다.',
      },
      {
        title: '하나의 스크립트에 쌓인 7개 장면',
        content:
          'p5.js Web Editor에서 모든 장면을 한 스크립트로 작성하다 보니 장면을 서로 연결할수록 코드가 길어지고 관리가 어려워졌습니다. 장면별로 스크립트를 나누고 VS Code와 로컬 서버 환경으로 옮겨 장면 전환을 매끄럽게 만드는 방향으로 개선 계획을 세웠습니다.',
      },
    ],
    tags: ['p5.js', 'JavaScript', 'Interactive Art'],
    links: [
      {
        label: 'p5.js Editor',
        href: 'https://editor.p5js.org/skim6870/sketches/PbL1h0EA8',
      },
    ],
  },
  {
    slug: 'samulnori-performance',
    title: '사물놀이 인터랙티브 퍼포먼스',
    category: 'art-tech',
    // TODO: 실제 기간으로 바꿔주세요
    period: '2026.03 – 2026.05',
    team: '5인 팀 프로젝트',
    role: '사운드 디자인 · 북 연주',
    description:
      'Google MediaPipe의 손 제스처 인식을 Max 8과 연결해, 허공에서 손을 움직여 사물놀이 가락(7채, 6채)을 연주하는 퍼포먼스입니다. Intro to Sonic Arts 기말 프로젝트로, 사운드를 맡아 북 소리를 만들고 공연에서 북 파트를 연주했습니다.',
    problem:
      '팀원 모두 풍물패 출신이라, 수업에서 배운 사운드 기술로 전통 타악기를 연주해 보자는 목표를 세웠습니다. 카메라에 비친 손동작을 장구·북·징 소리로 바꾸려면 손이 언제 "쳤는지" 판정하는 기준과, 실제 악기에 가까운 소리가 모두 필요했습니다.',
    solution:
      'MediaPipe가 인식한 검지 끝의 x·y 좌표를 Max 8로 받아 타격을 판정했습니다. 처음에는 화면을 구역으로 나눠, 징은 사분면 중 한 곳(x > 0.5, y < 0.5)에 손이 들어가면 소리가 나게 하고 장구는 더 좁은 구역으로 나눴습니다. 이후 y 좌표의 연속된 두 값을 빼 손의 속도를 구하고, 일정 속도 이상으로 내려칠 때만 소리가 나도록 판정 방식을 바꿨습니다. 저는 사운드를 맡아 subtractive synthesis로 북 소리를 합성했고, 이후 팀이 실제 악기를 직접 녹음한 소리로 교체했습니다.',
    result:
      '제스처 인식과 녹음한 악기 소리를 연결해 장구·북·징 파트를 나눠 맡고, 기말 발표에서 사물놀이 가락을 실시간으로 공연했습니다. 센서 지연 때문에 원래보다 느린 템포로 연주했습니다.',
    troubleshooting: [
      {
        title: '한 번 쳤는데 소리가 여러 번 나는 문제',
        content:
          '구역 판정 방식에서는 손이 목표 구역에 머무는 동안 계속 조건을 만족해, 한 번의 동작에 소리가 여러 번 울렸습니다. onebang 오브젝트를 metro 500과 연결해 0.5초에 한 번만 소리가 나도록 제한했지만 연주가 여전히 부자연스러웠습니다. 그래서 손의 위치 대신 y축 속도를 기준으로 판정하도록 바꿔, 실제로 내려치는 순간에만 소리가 나게 했습니다.',
      },
      {
        title: '합성으로는 나지 않는 가죽 소리',
        content:
          'subtractive synthesis로 북을 합성했지만 가죽을 두드리는 특유의 소리가 나지 않고 서양 탐탐 드럼처럼 들렸습니다. FM synthesis로 만든 징도 소리가 끝나지 않고 길게 이어지는 문제가 있었습니다. 합성음으로는 사물놀이의 질감을 살리기 어렵다고 판단해 장구·북·징·꽹과리를 직접 녹음해 사용했습니다.',
      },
    ],
    tags: ['Google MediaPipe', 'Max 8', 'Gesture Recognition', 'Sound Design'],
    links: [],
    featured: true,
  },
  {
    slug: 'chalkak',
    title: '찰칵!',
    category: 'game',
    period: '2024 (약 1년)',
    team: '5인 팀 프로젝트',
    role: '기획 · 개발 (메인 맵, 미니게임 3)',
    description:
      '국궁, 임실필봉농악, 문화재 복원을 소재로 한 Unity(C#) 2D 탑다운 RPG입니다. 메인 맵 시스템과 "경복궁 낙서 지우기" 미니게임 개발을 맡았고, ATC 2024에서 전시했습니다.',
    problem:
      '청년 세대에게 고리타분하게 느껴지는 문화유산을 게임으로 자연스럽게 체험하게 하는 것이 목표였습니다. 메인 맵 탐험과 미니게임 3개로 이어지는 이야기를 하나의 흐름으로 묶어야 했고, 씬을 오가도 진행 상황이 유지되어야 했습니다.',
    solution:
      '메인 맵은 플레이어가 아래에서 위로 이동하며 미니게임을 순서대로 만나는 구조로 설계했습니다. GameManager가 대화·저장/로드·메뉴·BGM 등 전체 상태를, QuestManager가 퀘스트 단계에 따른 오브젝트 활성화와 씬 전환을, TalkManager가 대화 ID별 대사와 캐릭터 초상화를 Dictionary로 관리하도록 역할을 나눴습니다. "경복궁 낙서 지우기" 미니게임은 60초 안에 색상·태그가 맞는 복원 타일로 낙서 타일을 지우는 방식이고, 지운 뒤에도 흔적이 남게 해 실제 복원 작업의 어려움을 표현했습니다. 타일 클릭은 OnMouseDown()과 태그 비교로 처리하고, 남은 타일 수를 매 프레임 확인해 모두 지우면 타이머와 BGM을 멈추고 완료 버튼을 활성화했습니다.',
    result:
      'ATC 2024(11.20–23)에서 전시하고, 24-2학기 서강융합기술경진대회 AI/SW-아이디어 부문에 출품했습니다. 관람객들에게 "강요하는 느낌 없이 자연스럽게 스며든다", "학교 교육 프로그램으로 활용하면 좋겠다"는 반응을 얻었습니다.',
    troubleshooting: [
      {
        title: '씬을 오가면 사라지는 열쇠 조각',
        content:
          '미니게임은 별도 씬이라, 메인 맵으로 돌아오면 앞서 얻은 열쇠 조각 같은 오브젝트가 초기화될 수 있었습니다. QuestManager의 questObject 배열에 미니게임 3개, 열쇠 조각 3개, 완성된 열쇠를 함께 묶고 DontDestroyOnLoad()로 씬이 바뀌어도 유지되게 해, 씬 전환과 열쇠 UI를 한곳에서 다루도록 했습니다.',
      },
      {
        title: '전시에서 드러난 조작 방식의 혼란',
        content:
          '인트로·아웃트로는 마우스 클릭, 메인 맵은 방향키·스페이스바, 미니게임은 각자 다른 입력을 쓰다 보니 ATC 관람객들이 조작법을 헷갈려 팀원이 계속 옆에서 설명해야 했습니다. 기능별로 따로 공부하며 만들면서 조작 체계를 먼저 정하지 않은 것이 원인이었고, 개발 초기에 입력 방식을 통일하고 출시 전 사용자 테스트를 거쳐야 한다는 점을 배웠습니다.',
      },
    ],
    tags: ['Unity', 'C#', '2D RPG'],
    links: [
      { label: '시연 영상', href: 'https://www.youtube.com/watch?v=eRey8EpW7TQ' },
      {
        label: 'Unity Play (PW: LISSOME)',
        href: 'https://play.unity.com/en/games/d151a203-0b33-443a-ac29-1110edc4ea97/cheese1',
      },
    ],
    featured: true,
  },
]

export const skills: SkillGroup[] = [
  { category: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'ESLint', 'Prettier'] },
]

// 학력. 비워두면 /about에서 섹션이 숨겨진다
export const education: TimelineItem[] = [
  {
    period: '2023.02 –',
    title: '서강대학교 아트&테크놀로지학과',
    description: '융합소프트웨어 연계전공 · 재학 중',
  },
  {
    period: '2025.01 – 2025.05',
    title: 'The Pennsylvania State University',
    description: '교환학생',
  },
]

// 수상·자격증. 비워두면 /about에서 섹션이 숨겨진다
export const awards: TimelineItem[] = [
  {
    period: '2026.05',
    title: 'ADsP (데이터분석 준전문가)',
    description: '2026.05.17 취득',
  },
  {
    period: '2025.11',
    title: 'AI-Prenuer Camp 최우수상',
    description: '서강대학교 창업지원단',
  },
  {
    period: '2024.02',
    title: 'TOEFL 101점',
    description: '2024.02.17 취득',
  },
]

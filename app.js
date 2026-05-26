document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // FAQ Accordion Interactivity
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items first
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Scroll Reveal Animation Setup (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Interactive Timeline Observer
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find which item is intersection and highlight it and previous ones
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.5
  });
  timelineItems.forEach(item => timelineObserver.observe(item));

  // SIMULATOR DATA & ENGINE
  
  // Available profiles and advertisements
  const profiles = [
    {
      age: "20대 중후반 (28세)",
      device: "모바일 (iPhone 15 Pro)",
      interest: "피트니스, 조깅, 웰빙 스포츠",
      winnerName: "Nike Running Club",
      winnerPrice: 3.42,
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      bids: [
        { dspName: "DSP 1 (스포츠웨어)", rate: "96%", bid: 3.42, desc: "사용자 러닝에 최적화된 Nike 러닝화 리타겟팅 적용" },
        { dspName: "DSP 2 (글로벌 테크)", rate: "42%", bid: 1.65, desc: "스마트 피트니스 워치 프로모션 매칭" },
        { dspName: "DSP 3 (식음료/푸드)", rate: "12%", bid: 0.85, desc: "일반 탄산음료 단일 지면 노출 입찰" }
      ]
    },
    {
      age: "30대 초반 (33세)",
      device: "노트북 (MacBook Air)",
      interest: "동남아 여행, 호캉스 패키지, 호텔 리뷰",
      winnerName: "Booking.com VIP",
      winnerPrice: 4.88,
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
      bids: [
        { dspName: "DSP 1 (스포츠웨어)", rate: "8%", bid: 0.40, desc: "해변 비치웨어 컬렉션 매칭 입찰" },
        { dspName: "DSP 2 (글로벌 테크)", rate: "55%", bid: 2.10, desc: "여행용 노이즈 캔슬링 헤드폰 입찰" },
        { dspName: "DSP 3 (식음료/여행)", rate: "98%", bid: 4.88, desc: "사용자 최근 휴가 검색에 따른 발리 리조트 초특가 리타겟팅" }
      ]
    },
    {
      age: "10대 후반 (18세)",
      device: "스마트폰 (Galaxy S24 Ultra)",
      interest: "FPS 모바일게임, e스포츠 하이라이트, 게이밍 기어",
      winnerName: "Razer Gaming Tech",
      winnerPrice: 2.95,
      imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80",
      bids: [
        { dspName: "DSP 1 (스포츠웨어)", rate: "35%", bid: 1.10, desc: "캐주얼 트레이닝 후드티 노출" },
        { dspName: "DSP 2 (글로벌 테크)", rate: "95%", bid: 2.95, desc: "최신 RGB 기계식 키보드 & 마우스 세트 맞춤 입찰" },
        { dspName: "DSP 3 (식음료/푸드)", rate: "68%", bid: 1.80, desc: "게이머 에너지 드링크 캔 할인 프로모션" }
      ]
    },
    {
      age: "40대 중후반 (47세)",
      device: "태블릿 (iPad Pro)",
      interest: "자산 관리, 부동산 재테크, 골프 골프장 예약",
      winnerName: "Genesis Golf Invitational",
      winnerPrice: 5.75,
      imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&auto=format&fit=crop&q=80",
      bids: [
        { dspName: "DSP 1 (스포츠웨어)", rate: "88%", bid: 4.50, desc: "프리미엄 골프웨어 가을 라인 타겟팅" },
        { dspName: "DSP 2 (글로벌 테크)", rate: "60%", bid: 3.10, desc: "프라이빗 웰스 매니지먼트 비대면 자산 상담 결합" },
        { dspName: "DSP 3 (라이프스타일)", rate: "92%", bid: 5.75, desc: "수도권 명품 회원제 골프클럽 연간 이용권 예약 경합 최고가" }
      ]
    }
  ];

  let currentProfileIndex = 0;
  let isSimulating = false;

  // DOM Elements
  const btnStartSim = document.getElementById('btnStartSim');
  const btnRandomProfile = document.getElementById('btnRandomProfile');
  const targetUserProfile = document.getElementById('targetUserProfile');
  
  const metricTimer = document.getElementById('metricTimer');
  const metricBidders = document.getElementById('metricBidders');
  const metricWinnerPrice = document.getElementById('metricWinnerPrice');
  
  const simConsole = document.getElementById('simConsole');
  
  const adSlot = document.getElementById('adSlot');
  const adPlaceholder = document.getElementById('adPlaceholder');
  const adImg = document.getElementById('adImg');
  const adWinnerTag = document.getElementById('adWinnerTag');

  // Network Nodes and SVG flow lines
  const nodeUser = document.getElementById('nodeUser');
  const nodeSSP = document.getElementById('nodeSSP');
  const nodeExchange = document.getElementById('nodeExchange');
  const nodeDsp1 = document.getElementById('nodeDsp1');
  const nodeDsp2 = document.getElementById('nodeDsp2');
  const nodeDsp3 = document.getElementById('nodeDsp3');

  // Function to set profile UI
  function updateProfileUI() {
    const profile = profiles[currentProfileIndex];
    targetUserProfile.innerHTML = `연령대: <strong>${profile.age}</strong>, 주사용 기기: <strong>${profile.device}</strong>, 관심사: <strong>${profile.interest}</strong>`;
    
    // Log profile change in console
    addConsoleLine(`[SYSTEM] 가상 오디언스 정보가 갱신되었습니다.`, 'system');
    addConsoleLine(`* 연령/기기: ${profile.age} | ${profile.device}`, 'info');
    addConsoleLine(`* 핵심 관심분야: ${profile.interest}`, 'info');
    simConsole.scrollTop = simConsole.scrollHeight;
  }

  // Initial Profile UI load
  updateProfileUI();

  // Change Profile Button Click
  btnRandomProfile.addEventListener('click', () => {
    if (isSimulating) return;
    currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
    updateProfileUI();
    resetAdSlotUI();
  });

  // Helper to add clean formatted console lines
  function addConsoleLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `console-line ${className}`;
    line.innerText = text;
    simConsole.appendChild(line);
    simConsole.scrollTop = simConsole.scrollHeight;
  }

  // Reset Phone Screen ad slot back to empty state
  function resetAdSlotUI() {
    adSlot.className = 'ad-slot-wrapper';
    adPlaceholder.style.opacity = '1';
    adPlaceholder.style.pointerEvents = 'all';
    adImg.className = 'ad-image';
    adImg.src = '';
    adWinnerTag.className = 'ad-winner-tag';
    
    metricTimer.innerText = '000.0ms';
    metricTimer.style.background = '';
    metricTimer.style.webkitTextFillColor = '';
    
    metricBidders.innerText = '0';
    metricWinnerPrice.innerText = '$0.00';

    // Clear network active nodes
    document.querySelectorAll('.net-node').forEach(node => {
      node.classList.remove('active', 'cyan', 'success');
    });
    
    // Clear SVG dynamic style states
    const pulses = ['pulseUserToSSP', 'pulseSSPToExchange', 'pulseExchangeToDsp1', 'pulseExchangeToDsp2', 'pulseExchangeToDsp3'];
    pulses.forEach(id => {
      const pulse = document.getElementById(id);
      if (pulse) {
        pulse.style.opacity = '0';
        pulse.style.animation = 'none';
      }
    });
  }

  // Trigering the real visual simulation (mapping 100ms to 3.0s interactive show)
  btnStartSim.addEventListener('click', () => {
    if (isSimulating) return;
    
    isSimulating = true;
    btnStartSim.disabled = true;
    btnRandomProfile.disabled = true;
    
    resetAdSlotUI();
    simConsole.innerHTML = '';  // Clear console

    const currentProfile = profiles[currentProfileIndex];
    
    addConsoleLine(`[0ms] [REQUEST] 방문자가 뉴스 사이트에 접속했습니다!`, 'system');
    addConsoleLine(`[SYSTEM] RTB 100ms 실시간 광고 경매가 작동하기 시작합니다.`, 'info');

    // Run high-precision clock simulation (0ms to 100ms counting)
    let simStartTime = performance.now();
    const duration = 3000; // 3 seconds visual time
    
    function animateClock() {
      if (!isSimulating) return;
      const elapsed = performance.now() - simStartTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Interpolate progress linearly to 0ms - 100.0ms
      const msValue = (progress * 100).toFixed(1);
      metricTimer.innerText = `${msValue}ms`;
      
      if (progress < 1) {
        requestAnimationFrame(animateClock);
      }
    }
    requestAnimationFrame(animateClock);

    // Setup visual workflow timelines
    
    // --- Step 1: User to SSP (0.0s - 0.6s) ---
    nodeUser.classList.add('active');
    adSlot.classList.add('bidding');
    
    triggerPulse('pulseUserToSSP', 'flow 0.6s linear infinite', 'rgba(139, 92, 246, 0.8)');

    setTimeout(() => {
      nodeSSP.classList.add('active', 'cyan');
      addConsoleLine(`[18ms] [SSP] 지면(Ad Slot) 분석 완료. 유저 쿠키 세그먼트를 캡슐화합니다.`, 'info');
      addConsoleLine(`[25ms] SSP -> Ad Exchange로 입찰 요청(Bid Request) 전송 중...`, 'info');
      
      triggerPulse('pulseSSPToExchange', 'flow 0.6s linear infinite', 'rgba(6, 182, 212, 0.8)');
    }, 600);

    // --- Step 2: Ad Exchange to DSPs (0.6s - 1.2s) ---
    setTimeout(() => {
      nodeExchange.classList.add('active', 'cyan');
      addConsoleLine(`[38ms] [EXCHANGE] 입찰 중개 서버 수신 완료. 전 세계 DSP 네트워크 브로드캐스트 시작.`, 'system');
      
      triggerPulse('pulseExchangeToDsp1', 'flow 0.6s linear infinite', 'rgba(255, 255, 255, 0.3)');
      triggerPulse('pulseExchangeToDsp2', 'flow 0.6s linear infinite', 'rgba(255, 255, 255, 0.3)');
      triggerPulse('pulseExchangeToDsp3', 'flow 0.6s linear infinite', 'rgba(255, 255, 255, 0.3)');
    }, 1200);

    // --- Step 3: DSPs Bidding Competitiveness (1.2s - 2.2s) ---
    setTimeout(() => {
      nodeDsp1.classList.add('active');
      nodeDsp2.classList.add('active');
      nodeDsp3.classList.add('active');
      
      metricBidders.innerText = '3';
      
      addConsoleLine(`[52ms] [DMP & DSPs] 3개 테마별 광고 구매 플랫폼(DSP) 데이터 실시간 가치 분석 돌입.`, 'info');
      
      // Print bidder logs sequentially
      setTimeout(() => {
        const bid1 = currentProfile.bids[0];
        addConsoleLine(`[68ms] [DSP 1] 분석 완료 -> ${bid1.dspName} | 매칭률: ${bid1.rate} | 제안가: $${bid1.bid.toFixed(2)} CPM`, 'bid');
        addConsoleLine(`  ┗ 상세설명: "${bid1.desc}"`, 'info');
      }, 200);

      setTimeout(() => {
        const bid2 = currentProfile.bids[1];
        addConsoleLine(`[73ms] [DSP 2] 분석 완료 -> ${bid2.dspName} | 매칭률: ${bid2.rate} | 제안가: $${bid2.bid.toFixed(2)} CPM`, 'bid');
        addConsoleLine(`  ┗ 상세설명: "${bid2.desc}"`, 'info');
      }, 500);

      setTimeout(() => {
        const bid3 = currentProfile.bids[2];
        addConsoleLine(`[79ms] [DSP 3] 분석 완료 -> ${bid3.dspName} | 매칭률: ${bid3.rate} | 제안가: $${bid3.bid.toFixed(2)} CPM`, 'bid');
        addConsoleLine(`  ┗ 상세설명: "${bid3.desc}"`, 'info');
      }, 800);

    }, 1800);

    // --- Step 4: Ad Exchange Winner Decisions & Render (2.2s - 3.0s) ---
    setTimeout(() => {
      // Pick Winner (It is pre-calculated based on our high bids in profile)
      const bids = [...currentProfile.bids];
      bids.sort((a, b) => b.bid - a.bid);
      const winner = bids[0];
      
      // Determine which node is the winner
      let winnerNodeId = 'nodeDsp1';
      let winnerPulseId = 'pulseExchangeToDsp1';
      if (winner.dspName.includes('DSP 2')) {
        winnerNodeId = 'nodeDsp2';
        winnerPulseId = 'pulseExchangeToDsp2';
      } else if (winner.dspName.includes('DSP 3')) {
        winnerNodeId = 'nodeDsp3';
        winnerPulseId = 'pulseExchangeToDsp3';
      }

      // Highlight winning elements in success green color!
      const winNode = document.getElementById(winnerNodeId);
      winNode.classList.add('success');
      
      // Reverse winning pulse to return back to exchange and publisher
      const winPulse = document.getElementById(winnerPulseId);
      winPulse.style.stroke = 'var(--color-success)';
      winPulse.style.strokeWidth = '4';
      winPulse.style.boxShadow = '0 0 10px var(--color-success)';
      
      addConsoleLine(`[88ms] [EXCHANGE] 경매 마감! 최고가 입찰가 판독 완료.`, 'system');
      addConsoleLine(`▶ [WINNER] ${winner.dspName} 최종 낙찰! 가격: $${winner.bid.toFixed(2)} (eCPM)`, 'win');

      metricWinnerPrice.innerText = `$${winner.bid.toFixed(2)}`;

      setTimeout(() => {
        addConsoleLine(`[95ms] [SSP] 낙찰된 크리에이티브(이미지/스크립트) 전달 및 보안 유효성 무결성 통과.`, 'info');
        addConsoleLine(`[100ms] [RENDER] 실시간 경매 완료. 사용자 디스플레이 렌더링을 시작합니다.`, 'win');
        
        // Show actual ad elements in mobile frame
        adSlot.classList.remove('bidding');
        adSlot.classList.add('active');
        adPlaceholder.style.opacity = '0';
        adPlaceholder.style.pointerEvents = 'none';
        
        adImg.src = currentProfile.imageUrl;
        adImg.classList.add('show');
        
        adWinnerTag.innerText = `WINNER: ${winner.dspName.split(' ')[0]} $${winner.bid.toFixed(2)}`;
        adWinnerTag.classList.add('show');

        // Finish state
        isSimulating = false;
        btnStartSim.disabled = false;
        btnRandomProfile.disabled = false;
      }, 400);

    }, 2800);
  });

  // Pulse trigering mechanism for SVG paths
  function triggerPulse(id, animationVal, strokeVal) {
    const pulse = document.getElementById(id);
    if (pulse) {
      pulse.style.opacity = '1';
      pulse.style.stroke = strokeVal;
      pulse.style.animation = animationVal;
    }
  }
});

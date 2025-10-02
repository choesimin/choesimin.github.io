// Word Cloud for Note Pages
(function() {
  // Custom stopwords list
  const stopwords = [
    // 어미
    '입니다', '합니다', '습니다', '있습니다', '됩니다', '때문입니다', '않습니다',
    '입니까', '습니까', '있습니까',
    '있다', '없다', '하다', '되다', '이다', '아니다', '같다', '보다', '받다', '주다', '오다', '가다',
    '하면', '되면', '이면', '라면',
    '해서', '되어', '이어',
    // 명사형 의존명사
    '것', '수', '등', '때', '경우', '중', '번', '개', '점', '상', '하',
    '바', '만큼', '듯', '대로', '채', '김', '나머지',
    // 접속사/부사
    '및', '또는', '그리고', '하지만', '그러나', '따라서', '즉', '또한',
    '매우', '더', '덜', '가장', '너무', '아주', '정말', '진짜',
    '통해', '따라', '위해', '대해', '관해', '보다', '같이', '처럼',
    // 대명사/지시어
    '이', '그', '저', '이것', '그것', '저것', '여기', '거기', '저기',
    '이런', '그런', '저런', '이러한', '그러한', '저러한',
    // 숫자
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    // 단위
    '년', '월', '일', '시', '분', '초',
  ];

  // Get content from the page
  const contentElement = document.querySelector('.note-content');
  if (!contentElement) return;

  // Clone and remove unwanted elements
  const clone = contentElement.cloneNode(true);
  clone.querySelectorAll('script, style, .giscus, pre, code').forEach(el => el.remove());

  const text = clone.innerText;

  // Extract and count words
  const words = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()[\]"'?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');

  const frequency = {};

  words.forEach(word => {
    // Remove common Korean particles and endings from the end
    word = word.replace(/(을|를|이|가|은|는|의|에|에서|와|과|도|만|까지|부터|로|으로|에게|한테|께|하고|이랑|이나|거나|나|이든|든|조차|마저|밖에|뿐|라고|이라고|입니다|합니다|습니다|있습니다|됩니다|않습니다|입니까|습니까|니까|나요|네요|어요|아요|지요|죠|ㅂ니다|ㅂ니까|하며|되며|이며|면서|든지|건|지만|위한|위해|대한|대해|관한|관해|따른|따라|할수|될수|있는|없는|하는|되는|한|된)$/g, '');

    // Filter: length > 1 and not in stopwords
    if (word.length > 1 && !stopwords.includes(word)) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  // Convert to array and sort by frequency
  const wordList = Object.entries(frequency)
    .map(([text, size]) => ({ text, size }))
    .sort((a, b) => b.size - a.size);

  if (wordList.length === 0) return;

  // Find max frequency for scaling
  const maxSize = Math.max(...wordList.map(d => d.size));
  const minSize = Math.min(...wordList.map(d => d.size));

  // Create word cloud
  const width = 800;
  const height = 400;

  const layout = d3.layout.cloud()
    .size([width, height])
    .words(wordList.map(d => ({
      text: d.text,
      size: 10 + (d.size - minSize) / (maxSize - minSize) * 60
    })))
    .padding(2)
    .rotate(() => 0)
    .fontSize(d => d.size)
    .on('end', draw);

  layout.start();

  function draw(words) {
    const svg = d3.select('#wordcloud')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('max-width', '100%')
      .style('height', 'auto');

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    g.selectAll('text')
      .data(words)
      .enter().append('text')
      .style('font-size', d => `${d.size}px`)
      .style('font-family', 'Arial, sans-serif')
      .style('fill', '#333')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text(d => d.text);

    // Generate related notes based on top keywords
    generateRelatedNotes(wordList);
  }

  // Function to generate related notes recommendations
  function generateRelatedNotes(wordList) {
    // Get top 3 keywords
    const topKeywords = wordList.slice(0, 3).map(w => w.text);

    if (topKeywords.length === 0) return;

    // Fetch search data
    fetch('/assets/json/search.json')
      .then(response => response.json())
      .then(allNotes => {
        const currentUrl = window.location.pathname;
        const relatedNotesSet = new Set();
        const relatedNotes = [];

        // Search for each keyword
        topKeywords.forEach(keyword => {
          allNotes.forEach(note => {
            // Skip current note
            if (note.url === currentUrl) return;

            // Check if keyword appears in title or description
            const searchText = `${note.title} ${note.description}`.toLowerCase();
            if (searchText.includes(keyword.toLowerCase())) {
              // Use URL as unique identifier to avoid duplicates
              if (!relatedNotesSet.has(note.url)) {
                relatedNotesSet.add(note.url);
                relatedNotes.push(note);
              }
            }
          });
        });

        // Display related notes if any found
        if (relatedNotes.length > 0) {
          displayRelatedNotes(relatedNotes, topKeywords);
        }
      })
      .catch(error => {
        console.error('Error fetching related notes:', error);
      });
  }

  // Function to display related notes
  function displayRelatedNotes(notes, keywords) {
    const wordcloudContainer = document.getElementById('wordcloud');
    if (!wordcloudContainer) return;

    // Create related notes container
    const relatedContainer = document.createElement('div');
    relatedContainer.className = 'related-notes-container';
    relatedContainer.style.marginTop = '20px';

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'related-notes-toggle';
    toggleButton.innerHTML = `연관 글 추천 (${notes.length}개) ▼`;
    toggleButton.style.cssText = `
      padding: 8px 0;
      background: white;
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    `;

    // Create content container (initially hidden)
    const contentContainer = document.createElement('div');
    contentContainer.className = 'related-notes-content';
    contentContainer.style.display = 'none';
    contentContainer.style.marginTop = '10px';

    // Add keywords info
    const keywordsInfo = document.createElement('div');
    keywordsInfo.style.cssText = `
      padding: 10px;
      background: #f7f7f7;
      border-left: 2px solid black;
      margin-bottom: 15px;
      font-size: 13px;
      color: #333;
    `;
    keywordsInfo.innerHTML = `<strong>검색 키워드:</strong> ${keywords.join(', ')}`;
    contentContainer.appendChild(keywordsInfo);

    // Add related notes
    notes.forEach(note => {
      const noteCard = document.createElement('div');
      noteCard.style.cssText = `
        padding: 12px;
        margin-bottom: 10px;
        border: 1px solid black;
        background: white;
      `;
      noteCard.onmouseover = () => {
        noteCard.style.background = '#f3f3f3';
      };
      noteCard.onmouseout = () => {
        noteCard.style.background = 'white';
      };

      const link = document.createElement('a');
      link.href = note.url;
      link.style.cssText = 'text-decoration: none; color: inherit;';

      const title = document.createElement('h4');
      title.style.cssText = 'margin: 0 0 8px 0; color: #333; font-size: 15px;';
      title.textContent = note.title;

      const description = document.createElement('p');
      description.style.cssText = 'margin: 0; color: #555; font-size: 13px; line-height: 1.4;';
      description.textContent = note.description;

      link.appendChild(title);
      link.appendChild(description);
      noteCard.appendChild(link);
      contentContainer.appendChild(noteCard);
    });

    // Toggle functionality
    let isExpanded = false;
    toggleButton.addEventListener('click', () => {
      isExpanded = !isExpanded;
      contentContainer.style.display = isExpanded ? 'block' : 'none';
      toggleButton.innerHTML = `연관 글 추천 (${notes.length}개) ${isExpanded ? '▲' : '▼'}`;
    });

    relatedContainer.appendChild(toggleButton);
    relatedContainer.appendChild(contentContainer);

    // Insert after wordcloud
    wordcloudContainer.appendChild(relatedContainer);
  }
}());

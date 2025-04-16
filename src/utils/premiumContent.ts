
/**
 * Utility functions for handling premium content
 */

/**
 * Extracts free tier content from the full guide markdown
 */
export const getFreeTierContent = (content: string): string => {
  const sections = content.split(/^## /m);
  
  // Always show the first 2 sections (intro + 1 more)
  let freeTierContent = sections[0]; // This is content before the first ## heading
  
  // Add the first 2 proper sections (if they exist)
  for (let i = 1; i <= 2 && i < sections.length; i++) {
    freeTierContent += `## ${sections[i]}`;
  }
  
  // Add premium teaser
  freeTierContent += `\n\n## 🔒 Premium Content\nUpgrade to Premium for full access to:\n\n`;
  
  // Add list of locked sections
  for (let i = 3; i < sections.length; i++) {
    const sectionTitle = sections[i].split('\n')[0];
    freeTierContent += `- 🔒 ${sectionTitle}\n`;
  }
  
  freeTierContent += `\nUnlock all content for $24.99/month.`;
  
  return freeTierContent;
};

/**
 * Transforms markdown content to HTML with premium limitations
 */
export const transformContentWithPremiumLimits = (content: string, isPremium: boolean, isHtml = false): string => {
  if (isPremium) {
    // Premium users see everything
    if (isHtml) {
      return content
        .replace(/^# (.*)/gm, '<h1>$1</h1>')
        .replace(/^## (.*)/gm, '<h2>$1</h2>')
        .replace(/^### (.*)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^- (.*)/gm, '<ul><li>$1</li></ul>')
        .replace(/<\/ul><ul>/g, '')
        .split('\n\n')
        .map(para => para.startsWith('<h') || para.startsWith('<ul') ? para : `<p>${para}</p>`)
        .join('');
    }
    return content;
  }
  
  // Free users see limited content
  if (!isHtml) {
    return getFreeTierContent(content);
  }
  
  const sections = content.split(/<h2>/i);
  let transformedContent = sections[0]; // Content before first h2
  
  // Add first 2 sections
  for (let i = 1; i <= 2 && i < sections.length; i++) {
    transformedContent += `<h2>${sections[i]}`;
  }
  
  // Add premium teaser
  transformedContent += `
    <h2>🔒 Premium Content</h2>
    <p>Upgrade to Premium for full access to:</p>
    <ul>
  `;
  
  // Add list of locked sections
  for (let i = 3; i < sections.length; i++) {
    const sectionTitle = sections[i].split('</h2>')[0];
    transformedContent += `<li>🔒 ${sectionTitle}</li>`;
  }
  
  transformedContent += `</ul>
    <p>Unlock all content for $24.99/month.</p>
    <div class="premium-cta">
      <button class="upgrade-btn">Upgrade to Premium</button>
    </div>
  `;
  
  return transformedContent;
};

/**
 * Converts markdown to HTML
 */
export const markdownToHtml = (markdown: string): string => {
  return markdown
    .replace(/^# (.*)/gm, '<h1>$1</h1>')
    .replace(/^## (.*)/gm, '<h2>$1</h2>')
    .replace(/^### (.*)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*)/gm, '<ul><li>$1</li></ul>')
    .replace(/<\/ul><ul>/g, '')
    .split('\n\n')
    .map(para => para.startsWith('<h') || para.startsWith('<ul') ? para : `<p>${para}</p>`)
    .join('');
};

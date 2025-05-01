
/**
 * Utility functions for handling premium content
 */

/**
 * Extracts free tier content from the full guide markdown
 */
export const getFreeTierContent = (content: string, level: 'preview' | 'free' = 'free'): string => {
  const sections = content.split(/^## /m);
  
  if (level === 'preview') {
    // Preview shows only intro and a teaser
    let previewContent = sections[0]; // Content before the first ## heading
    
    // Add only the first section (if it exists)
    if (sections.length > 1) {
      previewContent += `## ${sections[1]}`;
    }
    
    // Add registration teaser
    previewContent += `\n\n## 🔒 Create a Free Account\nSign up to see more content including:\n\n`;
    
    // Add list of locked sections
    for (let i = 2; i < Math.min(5, sections.length); i++) {
      const sectionTitle = sections[i].split('\n')[0];
      previewContent += `- 🔒 ${sectionTitle}\n`;
    }
    
    if (sections.length > 5) {
      previewContent += `- And ${sections.length - 5} more sections\n`;
    }
    
    previewContent += `\nCreate your free account to unlock these sections.`;
    
    return previewContent;
  }
  
  // Free tier shows more content - increasing from 2 to 3 sections
  let freeTierContent = sections[0]; // This is content before the first ## heading
  
  // Add the first 3 proper sections (increased from 2)
  for (let i = 1; i <= 3 && i < sections.length; i++) {
    freeTierContent += `## ${sections[i]}`;
  }
  
  // Show previews of the next 2 sections with truncated content
  if (sections.length > 4) {
    for (let i = 4; i <= 5 && i < sections.length; i++) {
      const sectionLines = sections[i].split('\n');
      const sectionTitle = sectionLines[0];
      
      // Add section title and a preview of the content (first paragraph)
      freeTierContent += `## ${sectionTitle}\n`;
      
      // Add one or two paragraphs as a teaser
      let previewText = '';
      let paragraphCount = 0;
      for (let j = 1; j < sectionLines.length && paragraphCount < 1; j++) {
        if (sectionLines[j].trim() !== '') {
          previewText += sectionLines[j] + '\n';
          if (sectionLines[j+1]?.trim() === '') {
            paragraphCount++;
          }
        }
      }
      
      freeTierContent += previewText + '\n...\n\n';
    }
  }
  
  // Add more enticing premium teaser with clear value proposition
  freeTierContent += `\n\n## 🌟 Unlock the Complete Interview Guide\n\n`;
  freeTierContent += `You've seen a preview of what PrepPair.me can do. Upgrade to Premium to access:\n\n`;
  
  // Add list of premium features with emojis for visual appeal
  freeTierContent += `- ✅ Complete interview guide with all ${sections.length - 1} sections\n`;
  freeTierContent += `- 💼 STAR story templates customized to your experience\n`;
  freeTierContent += `- 📝 AI-generated follow-up emails for after your interview\n`;
  freeTierContent += `- 📅 Interview tracking and calendar integration\n`;
  freeTierContent += `- 📊 Performance analytics and improvement suggestions\n\n`;
  
  // Add pricing with value proposition
  freeTierContent += `### Land your dream job faster with Premium - just $24.99/month\n`;
  freeTierContent += `*Cancel anytime. One successful interview pays for itself many times over.*`;
  
  return freeTierContent;
};

/**
 * Transforms markdown content to HTML with premium limitations
 */
export const transformContentWithPremiumLimits = (
  content: string, 
  isPremium: boolean, 
  isHtml = false, 
  level: 'preview' | 'free' = 'free'
): string => {
  if (isPremium) {
    // Premium users see everything
    if (isHtml) {
      return markdownToHtml(content);
    }
    return content;
  }
  
  // Non-premium users see limited content based on level
  if (!isHtml) {
    return getFreeTierContent(content, level);
  }
  
  // For HTML representation
  const htmlContent = markdownToHtml(getFreeTierContent(content, level));
  
  // Add registration or premium CTA based on level
  if (level === 'preview') {
    return htmlContent;
  }
  
  // Add premium CTA for free users
  return htmlContent;
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

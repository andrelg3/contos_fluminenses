import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

// Extract STORIES and BOSS_QUESTIONS from script.js
const scriptContent = fs.readFileSync('script.js', 'utf8');

const startStories = scriptContent.indexOf('const STORIES = [');
const startBoss = scriptContent.indexOf('const BOSS_QUESTIONS = [');
const endBoss = scriptContent.indexOf('];', startBoss);

const storiesStr = scriptContent.slice(startStories + 'const STORIES = '.length, startBoss).trim().replace(/;$/, '');
const bossStr = scriptContent.slice(startBoss + 'const BOSS_QUESTIONS = '.length, endBoss + 1).trim();

const STORIES = eval(storiesStr);
const BOSS_QUESTIONS = eval(bossStr);

console.log(`Loaded ${STORIES.length} stories and ${BOSS_QUESTIONS.length} boss questions.`);

const outputFile = 'gabarito_professor_contos_fluminenses.pdf';
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
  bufferPages: true,
  info: {
    Title: 'Gabarito Pedagógico Completo - O Enigma dos Contos Fluminenses',
    Author: 'Equipe Pedagógica - Machado de Assis',
    Subject: 'Caderno de Atividades, Enigmas e Questões Comentadas de Vestibular',
    Keywords: 'Machado de Assis, Contos Fluminenses, Literatura Brasileira, FUVEST, UNICAMP, ENEM, UERJ, Gabarito'
  }
});

const writeStream = fs.createWriteStream(outputFile);
doc.pipe(writeStream);

// Colors Palette
const PRIMARY = '#1b3b2b';      // Dark Regency Green
const SECONDARY = '#8a6d3b';    // Gold/Bronze
const ACCENT_RED = '#8b2626';   // Deep Wine
const TEXT_DARK = '#222222';    // Charcoal
const TEXT_MUTED = '#555555';   // Medium Grey
const BG_LIGHT = '#f7f6f2';     // Parchment Tint
const BG_CORRECT = '#e8f5e9';   // Soft Green
const BORDER_COLOR = '#d1cebe';

function checkPageSpace(doc, neededHeight) {
  if (doc.y + neededHeight > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
  }
}

// -------------------------------------------------------------
// COVER / HEADER SECTION
// -------------------------------------------------------------
doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80)
   .lineWidth(2)
   .strokeColor(SECONDARY)
   .stroke();

doc.rect(44, 44, doc.page.width - 88, doc.page.height - 88)
   .lineWidth(0.75)
   .strokeColor(PRIMARY)
   .stroke();

doc.moveDown(3);
doc.font('Helvetica-Bold')
   .fontSize(10)
   .fillColor(SECONDARY)
   .text('MATERIAL DIDÁTICO & GABARITO DO PROFESSOR — ENSINO MÉDIO E PRÉ-VESTIBULAR', { align: 'center', characterSpacing: 1.5 });

doc.moveDown(1);
doc.font('Helvetica-Bold')
   .fontSize(22)
   .fillColor(PRIMARY)
   .text('O ENIGMA DOS CONTOS FLUMINENSES', { align: 'center' });

doc.font('Helvetica-Oblique')
   .fontSize(14)
   .fillColor(ACCENT_RED)
   .text('Machado de Assis (1870) — Caderno Integral de Atividades e Questões', { align: 'center' });

doc.moveDown(1.5);
doc.font('Helvetica')
   .fontSize(10)
   .fillColor(TEXT_DARK)
   .text('Este documento contém a totalidade dos enunciados, variações de puzzles lógicos, análises psicológicas e questões de vestibular utilizadas na plataforma interativa, acompanhadas de suas respectivas resoluções comentadas e fundamentação crítica machadiana.', {
     align: 'center',
     lineGap: 3
   });

doc.moveDown(2);

// Summary Table / Overview
doc.font('Helvetica-Bold').fontSize(11).fillColor(PRIMARY).text('ESTRUTURA PEDAGÓGICA DO BANCO DE DADOS', { align: 'center' });
doc.moveDown(0.5);

const statsY = doc.y;
doc.rect(60, statsY, doc.page.width - 120, 80)
   .fillColor(BG_LIGHT)
   .fill();
doc.rect(60, statsY, doc.page.width - 120, 80)
   .strokeColor(BORDER_COLOR)
   .stroke();

doc.font('Helvetica-Bold').fontSize(9).fillColor(PRIMARY);
doc.text('• 7 Contos Fluminenses Completos', 75, statsY + 12);
doc.text('• 21 Puzzles de Reconstituição Lógica (3 variações por conto com dicas)', 75, statsY + 28);
doc.text('• 21 Análises Psicológicas & Sociais (3 variações por conto com justificativa)', 75, statsY + 44);
doc.text('• 21 Questões de Vestibular Estilo FUVEST, UNICAMP, ENEM e UERJ', 75, statsY + 60);

doc.text('• 5 Questões Boss Interdisciplinares (Desafio da Academia)', 340, statsY + 12);
doc.text('• Total: 68 Desafios Pedagógicos Cadastrados', 340, statsY + 28);
doc.text('• Habilidades BNCC: EM13LP01, EM13LP46, EM13LP49', 340, statsY + 44);
doc.text('• Fase: Transição Romantismo -> Realismo (1870-1875)', 340, statsY + 60);

doc.y = statsY + 100;
doc.moveDown(1);

// Index of Stories
doc.font('Helvetica-Bold').fontSize(11).fillColor(PRIMARY).text('SUMÁRIO DAS OBRAS ANALISADAS', 50, doc.y);
doc.moveDown(0.5);

STORIES.forEach((story, idx) => {
  doc.font('Helvetica-Bold').fontSize(9).fillColor(SECONDARY).text(`${story.numberText}: ${story.title}`, 60, doc.y, { continued: true });
  doc.font('Helvetica').fontSize(9).fillColor(TEXT_MUTED).text(` — ${story.location} | Eixos: ${story.tags.join(', ')}`);
  doc.moveDown(0.3);
});
doc.font('Helvetica-Bold').fontSize(9).fillColor(ACCENT_RED).text(`Desafio Final: Simulado da Academia Imperial`, 60, doc.y, { continued: true });
doc.font('Helvetica').fontSize(9).fillColor(TEXT_MUTED).text(` — 5 Questões de Síntese Comparativa Inter-Contos`);

doc.addPage();

// -------------------------------------------------------------
// ITERATE THROUGH ALL 7 STORIES
// -------------------------------------------------------------
STORIES.forEach((story, storyIdx) => {
  checkPageSpace(doc, 120);

  // Story Header Banner
  const bannerY = doc.y;
  doc.rect(50, bannerY, doc.page.width - 100, 42)
     .fillColor(PRIMARY)
     .fill();

  doc.font('Helvetica-Bold')
     .fontSize(9)
     .fillColor(SECONDARY)
     .text(story.numberText.toUpperCase(), 65, bannerY + 8);

  doc.font('Helvetica-Bold')
     .fontSize(15)
     .fillColor('#ffffff')
     .text(story.title.toUpperCase(), 65, bannerY + 20);

  doc.y = bannerY + 52;

  // Context Box
  doc.font('Helvetica-Bold').fontSize(9).fillColor(PRIMARY).text('1. CONTEXTO HISTÓRICO & SÍNTESE DO CONTO', 50, doc.y);
  doc.moveDown(0.3);
  doc.font('Helvetica').fontSize(8.5).fillColor(TEXT_DARK).text(story.step1Context.text, {
    align: 'justify',
    lineGap: 2
  });
  doc.moveDown(0.3);
  doc.font('Helvetica-Oblique').fontSize(8).fillColor(ACCENT_RED).text(`Trecho Marcante: "${story.step1Context.quote.replace(/— /g, '')}"`, {
    align: 'left'
  });

  doc.moveDown(1);
  doc.strokeColor(BORDER_COLOR).lineWidth(0.5).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
  doc.moveDown(0.8);

  // -------------------------------------------------------------
  // 2. PUZZLES POOL (3 Variations)
  // -------------------------------------------------------------
  checkPageSpace(doc, 60);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(SECONDARY).text('2. ETAPA DOS ENIGMAS: RECONSTITUIÇÃO LÓGICA E CRONOLÓGICA (3 Variações)');
  doc.moveDown(0.5);

  const puzzles = story.puzzlesPool && story.puzzlesPool.length ? story.puzzlesPool : [story.step2Puzzle];
  puzzles.forEach((puz, pIdx) => {
    checkPageSpace(doc, 100);

    doc.font('Helvetica-Bold').fontSize(9).fillColor(PRIMARY).text(`[Puzzle ${pIdx + 1}] ${puz.variantLabel || 'Variação ' + (pIdx + 1)}:`);
    doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(TEXT_DARK).text(`Instrução dada ao aluno: "${puz.instruction}"`);
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(8).fillColor(TEXT_MUTED).text('Fragmentos para Ordenar:');
    puz.fragments.forEach((frag) => {
      doc.font('Helvetica').fontSize(8).fillColor(TEXT_DARK).text(`• (${frag.id}) ${frag.text}`, { indent: 10, lineGap: 1.5 });
    });
    doc.moveDown(0.3);

    // Answer Key for Puzzle
    const correctItems = puz.correctOrder.map(id => {
      const f = puz.fragments.find(item => item.id === id);
      return f ? `[${id}] ${f.text}` : id;
    });

    const gabaritoY = doc.y;
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#1e5b22').text(`✓ GABARITO DA SEQUÊNCIA CORRETA:`, { indent: 5 });
    correctItems.forEach((itemText, ordIdx) => {
      doc.font('Helvetica').fontSize(7.5).fillColor('#1e5b22').text(`${ordIdx + 1}º -> ${itemText}`, { indent: 15, lineGap: 1 });
    });

    if (puz.hint) {
      doc.font('Helvetica-Oblique').fontSize(7.5).fillColor(SECONDARY).text(`💡 Dica fornecida pelo Narrador: ${puz.hint}`, { indent: 5 });
    }
    doc.moveDown(0.8);
  });

  doc.strokeColor(BORDER_COLOR).lineWidth(0.5).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
  doc.moveDown(0.8);

  // -------------------------------------------------------------
  // 3. ANALYSES POOL (3 Variations)
  // -------------------------------------------------------------
  checkPageSpace(doc, 60);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(SECONDARY).text('3. ETAPA DE ANÁLISE PSICOLÓGICA & MÁSCARAS SOCIAIS (3 Variações)');
  doc.moveDown(0.5);

  const analyses = story.analysesPool && story.analysesPool.length ? story.analysesPool : [story.step3Analysis];
  analyses.forEach((ana, aIdx) => {
    checkPageSpace(doc, 90);

    doc.font('Helvetica-Bold').fontSize(9).fillColor(PRIMARY).text(`[Análise ${aIdx + 1}] ${ana.title}`);
    doc.font('Helvetica').fontSize(8.5).fillColor(TEXT_DARK).text(ana.question, { lineGap: 2 });
    doc.moveDown(0.3);

    ana.options.forEach((opt) => {
      if (opt.correct) {
        doc.font('Helvetica-Bold').fontSize(8).fillColor('#1e5b22').text(`[GABARITO - ${opt.letter}] ${opt.text}  ✓`, { indent: 10, lineGap: 1.5 });
      } else {
        doc.font('Helvetica').fontSize(8).fillColor(TEXT_MUTED).text(`(${opt.letter}) ${opt.text}`, { indent: 10, lineGap: 1.5 });
      }
    });
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#1e5b22').text(`Comentário Pedagógico do Acerto:`, { indent: 5 });
    doc.font('Helvetica').fontSize(7.5).fillColor('#1e5b22').text(ana.feedbackCorrect, { indent: 10, lineGap: 1.5 });
    
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(ACCENT_RED).text(`Alerta sobre Distratores:`, { indent: 5 });
    doc.font('Helvetica').fontSize(7.5).fillColor(ACCENT_RED).text(ana.feedbackIncorrect, { indent: 10, lineGap: 1.5 });

    doc.moveDown(0.8);
  });

  doc.strokeColor(BORDER_COLOR).lineWidth(0.5).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
  doc.moveDown(0.8);

  // -------------------------------------------------------------
  // 4. VESTIBULAR POOL (3 Variations)
  // -------------------------------------------------------------
  checkPageSpace(doc, 60);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(SECONDARY).text('4. ETAPA VESTIBULAR & EXAMES NACIONAIS (3 Variações)');
  doc.moveDown(0.5);

  const vestibular = story.vestibularPool && story.vestibularPool.length ? story.vestibularPool : [story.step4Vestibular];
  vestibular.forEach((vest, vIdx) => {
    checkPageSpace(doc, 90);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(ACCENT_RED).text(`[Questão ${vIdx + 1} - ${vest.examTag}]`);
    doc.font('Helvetica').fontSize(8.5).fillColor(TEXT_DARK).text(vest.question, { lineGap: 2 });
    doc.moveDown(0.3);

    vest.options.forEach((opt) => {
      if (opt.correct) {
        doc.font('Helvetica-Bold').fontSize(8).fillColor('#1e5b22').text(`[GABARITO - ${opt.letter}] ${opt.text}  ✓`, { indent: 10, lineGap: 1.5 });
      } else {
        doc.font('Helvetica').fontSize(8).fillColor(TEXT_MUTED).text(`(${opt.letter}) ${opt.text}`, { indent: 10, lineGap: 1.5 });
      }
    });
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#1e5b22').text(`Resolução Comentada da Banca:`, { indent: 5 });
    doc.font('Helvetica').fontSize(7.5).fillColor('#1e5b22').text(vest.explanation, { indent: 10, lineGap: 1.5 });

    doc.moveDown(0.8);
  });

  if (storyIdx < STORIES.length - 1) {
    doc.addPage();
  }
});

// -------------------------------------------------------------
// 5. BOSS MODE / FINAL EXAM SECTION
// -------------------------------------------------------------
doc.addPage();

const bossBannerY = doc.y;
doc.rect(50, bossBannerY, doc.page.width - 100, 42)
   .fillColor(ACCENT_RED)
   .fill();

doc.font('Helvetica-Bold')
   .fontSize(9)
   .fillColor(SECONDARY)
   .text('SIMULADO FINAL INTEGRADO', 65, bossBannerY + 8);

doc.font('Helvetica-Bold')
   .fontSize(14)
   .fillColor('#ffffff')
   .text('DESAFIO DA ACADEMIA IMPERIAL — TODAS AS 5 QUESTÕES', 65, bossBannerY + 20);

doc.y = bossBannerY + 52;

doc.font('Helvetica').fontSize(8.5).fillColor(TEXT_DARK).text('As questões do Desafio da Academia Imperial avaliam a capacidade do estudante de correlacionar múltiplos contos da obra, identificando a evolução do estilo de Machado de Assis, a crítica ao parasitismo social, a sátira das instituições e as técnicas narrativas da prosa realista brasileira.', {
  align: 'justify',
  lineGap: 2
});
doc.moveDown(1);

BOSS_QUESTIONS.forEach((bq, bIdx) => {
  checkPageSpace(doc, 90);

  doc.font('Helvetica-Bold').fontSize(9).fillColor(PRIMARY).text(`[Questão Boss ${bIdx + 1} / 5] ${bq.title}`);
  doc.font('Helvetica').fontSize(8.5).fillColor(TEXT_DARK).text(bq.question, { lineGap: 2 });
  doc.moveDown(0.3);

  bq.options.forEach((opt) => {
    if (opt.correct) {
      doc.font('Helvetica-Bold').fontSize(8).fillColor('#1e5b22').text(`[GABARITO - ${opt.letter}] ${opt.text}  ✓`, { indent: 10, lineGap: 1.5 });
    } else {
      doc.font('Helvetica').fontSize(8).fillColor(TEXT_MUTED).text(`(${opt.letter}) ${opt.text}`, { indent: 10, lineGap: 1.5 });
    }
  });
  doc.moveDown(0.3);

  doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#1e5b22').text(`Fundamentação Crítica:`, { indent: 5 });
  doc.font('Helvetica').fontSize(7.5).fillColor('#1e5b22').text(bq.explanation, { indent: 10, lineGap: 1.5 });

  doc.moveDown(0.8);
});

// -------------------------------------------------------------
// FOOTER & PAGE NUMBERING (Applied to all buffered pages)
// -------------------------------------------------------------
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  
  // Top Header (pages > 0)
  if (i > 0) {
    doc.font('Helvetica').fontSize(7).fillColor(TEXT_MUTED);
    doc.text('O Enigma dos Contos Fluminenses — Caderno de Atividades e Gabarito do Professor', 50, 30, { align: 'left' });
    doc.text('Machado de Assis', doc.page.width - 150, 30, { align: 'right' });
    doc.strokeColor(BORDER_COLOR).lineWidth(0.5).moveTo(50, 40).lineTo(doc.page.width - 50, 40).stroke();
  }

  // Bottom Footer
  doc.strokeColor(BORDER_COLOR).lineWidth(0.5).moveTo(50, doc.page.height - 35).lineTo(doc.page.width - 50, doc.page.height - 35).stroke();
  doc.font('Helvetica').fontSize(7.5).fillColor(TEXT_MUTED);
  doc.text('Material de Apoio ao Docente — Reprodução autorizada para fins pedagógicos', 50, doc.page.height - 25, { align: 'left' });
  doc.text(`Página ${i + 1} de ${range.count}`, doc.page.width - 120, doc.page.height - 25, { align: 'right' });
}

doc.end();

writeStream.on('finish', () => {
  console.log(`PDF successfully created: ${outputFile}`);
});

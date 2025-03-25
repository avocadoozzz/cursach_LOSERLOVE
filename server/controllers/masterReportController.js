const { Master } = require('../models/models'); // Модель мастеров
const { User } = require('../models/models');   // Модель пользователей
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Создание отчета по выбранным мастерам
const createMasterReport = async (req, res) => {
  try {
    const { userId, masterIds } = req.body;

    // Проверяем, существует ли пользователь
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Получаем информацию о выбранных мастерах
    const masters = await Master.findAll({
      where: { id: masterIds }
    });

    if (!masters.length) {
      return res.status(404).json({ message: 'Мастера не найдены' });
    }

    // Создание PDF-отчета
    const doc = new PDFDocument();
    const reportPath = path.join(__dirname, `../../reports/master_report_${userId}.pdf`);
    const writeStream = fs.createWriteStream(reportPath);
    doc.pipe(writeStream);

    doc.fontSize(20).text(`Отчет по мастерам для ${user.name}`, { align: 'center' });
    doc.moveDown();

    masters.forEach(master => {
      doc.fontSize(14).text(`• ${master.name} - Специализация: ${master.specialization}`);
    });

    doc.end();

    writeStream.on('finish', () => {
      res.download(reportPath, `master_report_${userId}.pdf`);
    });

  } catch (error) {
    console.error('Ошибка при создании отчета:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { createMasterReport };

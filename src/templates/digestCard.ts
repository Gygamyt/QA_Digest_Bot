export function buildDigestCard(topic: string, digestText: string, sources: {title: string, url: string}[]) {
    const sourcesHtml = sources
        .map(s => `• <a href="${s.url}">${s.title}</a>`)
        .join("<br>");

    return {
        cardsV2: [
            {
                cardId: "dailyDigestCard",
                card: {
                    header: {
                        title: "Ежедневный QA Дайджест",
                        subtitle: topic,
                        imageUrl: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png",
                        imageType: "CIRCLE"
                    },
                    sections: [
                        {
                            widgets: [
                                {
                                    textParagraph: {
                                        text: digestText
                                    }
                                }
                            ]
                        },
                        {
                            header: "<b>🔗 Источники:</b>",
                            widgets: [
                                {
                                    textParagraph: {
                                        text: sourcesHtml || "<i>Источники не найдены</i>"
                                    }
                                }
                            ]
                        },
                        {
                            widgets: [
                                { divider: {} },
                                {
                                    decoratedText: {
                                        text: "<font color='#808080'>Сгенерировано AI-агентом</font>",
                                        startIcon: { knownIcon: "SMARTPHONE" }
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    };
}

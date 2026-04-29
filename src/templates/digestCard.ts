export function buildDigestCard(topic: string, digestText: string, isDebug: boolean) {

    const headerTitle = isDebug
        ? "🛠 [DEBUG MODE] QA Дайджест"
        : "Еженедельный QA Дайджест";

    return {
        cardsV2: [
            {
                cardId: "dailyDigestCard",
                card: {
                    header: {
                        title: headerTitle,
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
                    ]
                }
            }
        ]
    };
}

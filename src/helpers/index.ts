export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount);
}

export function formatDate(dateStr: string): string {
    const dateObj = new Date(dateStr + 'T00:00:00');
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}
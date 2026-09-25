const supabase = require("../config/supabase")

const getUserNotifications = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required.")
    }

    const { data, error } = await supabase
        .from("notification_recipients")
        .select(`
            id,
            notification_id,
            is_read,
            read_at,
            created_at,
            notification:notifications (
                id,
                type,
                title,
                message,
                created_at
            )
        `)
        .eq("user_id", userId)
        .order("created_at", {
            ascending: false,
        })

    if (error) {
        throw new Error(
            `Failed to load notifications: ${error.message}`
        )
    }

    const notifications = (data || [])
        .filter((item) => item.notification)
        .map((item) => ({
            id: item.id,
            notificationId: item.notification_id,
            type: item.notification.type,
            title: item.notification.title,
            description: item.notification.message,
            isRead: item.is_read,
            readAt: item.read_at,
            createdAt: item.notification.created_at,
        }))

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length

    return {
        notifications,
        unreadCount,
    }
}


const markNotificationAsRead = async (
    userId,
    recipientId
) => {
    if (!userId || !recipientId) {
        throw new Error(
            "User ID and notification ID are required."
        )
    }

    const { data, error } = await supabase
        .from("notification_recipients")
        .update({
            is_read: true,
            read_at: new Date().toISOString(),
        })
        .eq("id", recipientId)
        .eq("user_id", userId)
        .select("id, is_read, read_at")
        .single()

    if (error) {
        throw new Error(
            `Failed to mark notification as read: ${error.message}`
        )
    }

    return data
}


const markAllNotificationsAsRead = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required.")
    }

    const { error } = await supabase
        .from("notification_recipients")
        .update({
            is_read: true,
            read_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("is_read", false)

    if (error) {
        throw new Error(
            `Failed to mark all notifications as read: ${error.message}`
        )
    }

    return {
        success: true,
    }
}


const clearAllNotifications = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required.")
    }

    const { error } = await supabase
        .from("notification_recipients")
        .delete()
        .eq("user_id", userId)

    if (error) {
        throw new Error(
            `Failed to clear notifications: ${error.message}`
        )
    }

    return {
        success: true,
    }
}


module.exports = {
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
}
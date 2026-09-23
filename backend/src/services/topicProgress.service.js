const supabase = require("../config/supabase")

const CODE_SYNC_TOPICS = [
    "Arrays",
    "Strings",
    "Hashing",
    "Binary Search",
    "Stack",
    "Linked List",
    "Recursion",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Greedy",
    "Bit Manipulation",
]

const normalizeTopic = (topic = "") => {
    const value = topic
        .toLowerCase()
        .trim()

    if (
        value.includes("array") ||
        value === "prefix-sum" ||
        value === "two-pointers"
    ) {
        return "Arrays"
    }

    if (
        value.includes("string") ||
        value === "string-matching"
    ) {
        return "Strings"
    }

    if (
        value.includes("hash") ||
        value.includes("map")
    ) {
        return "Hashing"
    }

    if (
        value.includes("binary search") ||
        value === "binary-search"
    ) {
        return "Binary Search"
    }

    if (
        value === "stack" ||
        value.includes("monotonic stack")
    ) {
        return "Stack"
    }

    if (
        value.includes("linked list") ||
        value === "linked-list"
    ) {
        return "Linked List"
    }

    if (
        value.includes("recursion") ||
        value === "backtracking"
    ) {
        return "Recursion"
    }

    if (
        value.includes("tree") ||
        value === "binary-tree"
    ) {
        return "Trees"
    }

    if (
        value.includes("graph") ||
        value === "union-find"
    ) {
        return "Graphs"
    }

    if (
        value === "dynamic programming" ||
        value === "dynamic-programming" ||
        value === "dp"
    ) {
        return "Dynamic Programming"
    }

    if (
        value === "greedy" ||
        value.includes("greedy")
    ) {
        return "Greedy"
    }

    if (
        value.includes("bit manipulation") ||
        value === "bit-manipulation" ||
        value === "bitmask"
    ) {
        return "Bit Manipulation"
    }

    return null
}

const getTopicProgress = async (
    userId,
    platformData = {}
) => {
    const topicCounts = new Map()

    for (const topic of CODE_SYNC_TOPICS) {
        topicCounts.set(topic, 0)
    }

    // -----------------------------------------
    // LeetCode
    // -----------------------------------------

    for (
        const topic of platformData.leetcode || []
    ) {
        const normalized = normalizeTopic(
            topic.tagName ||
            topic.tagSlug
        )

        if (!normalized) {
            continue
        }

        topicCounts.set(
            normalized,
            topicCounts.get(normalized) +
                Number(topic.problemsSolved || 0)
        )
    }

    // -----------------------------------------
    // GFG
    // -----------------------------------------

    for (
        const topic of platformData.gfg || []
    ) {
        const normalized = normalizeTopic(
            topic.topicName ||
            topic.name ||
            topic.topic ||
            topic.slug
        )

        if (!normalized) {
            continue
        }

        topicCounts.set(
            normalized,
            topicCounts.get(normalized) +
                Number(
                    topic.problemsSolved ||
                    topic.solved ||
                    topic.count ||
                    0
                )
        )
    }

    // -----------------------------------------
    // Codeforces
    // -----------------------------------------

    for (
        const problem of platformData.codeforces || []
    ) {
        const tags = problem.tags || []

        const normalizedTopics = new Set()

        for (const tag of tags) {
            const normalized = normalizeTopic(tag)

            if (normalized) {
                normalizedTopics.add(normalized)
            }
        }

        for (const topic of normalizedTopics) {
            topicCounts.set(
                topic,
                topicCounts.get(topic) + 1
            )
        }
    }

    return CODE_SYNC_TOPICS.map((topic) => ({
        topic,
        solved: topicCounts.get(topic) || 0,
    }))
}

module.exports = {
    CODE_SYNC_TOPICS,
    normalizeTopic,
    getTopicProgress,
}
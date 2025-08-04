---
layout: note
permalink: /354
title: Neovim 설정 예시
description: Neovim은 init.lua file을 통해 Lua 기반으로 설정할 수 있습니다.
date: 2025-07-23
---


## Neovim Lua 설정 예시

- MacOS에서 Neovim을 Lua 기반으로 설정하는 예시입니다.
- `~/.config/nvim/init.lua` file을 사용하여 설정을 관리합니다.

```lua
-- Basic options
vim.opt.number = true
vim.opt.wrap = true
vim.opt.linebreak = true
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.background = "light"
vim.opt.encoding = "utf-8"
vim.opt.fileencoding = "utf-8"
vim.opt.termguicolors = false
vim.opt.autoread = true
vim.opt.updatetime = 100
vim.opt.clipboard = "unnamedplus"

-- Tab settings
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

-- Theme
vim.cmd.colorscheme("wildcharm")

-- File change detection
vim.api.nvim_create_autocmd({"FocusGained", "BufEnter", "CursorHold", "CursorHoldI"}, {
  pattern = "*",
  command = "checktime",
})

vim.api.nvim_create_autocmd("FileChangedShellPost", {
  pattern = "*",
  command = "echohl WarningMsg | echo 'File changed on disk. Buffer reloaded.' | echohl None",
})

-- Leader key
vim.g.mapleader = " "

-- Package manager setup
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git", "clone", "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- Plugins
require("lazy").setup({
  {
    "nvim-tree/nvim-tree.lua",
    config = function()
      require("nvim-tree").setup({
        view = {
          width = 30,
        },
        filters = {
          dotfiles = false,
        },
        renderer = {
          icons = {
            show = {
              git = false,
              folder = false,
              file = false,
              folder_arrow = false,
            },
          },
          indent_markers = {
            enable = true,
            inline_arrows = true,
            icons = {
              corner = "└",
              edge = "│",
              item = "│",
              none = " ",
            },
          },
        },
        on_attach = function(bufnr)
          local api = require('nvim-tree.api')
          api.config.mappings.default_on_attach(bufnr)
          vim.keymap.set('n', 'e', 'e', { buffer = bufnr })
        end,
      })
    end,
  },
  {
    "lewis6991/gitsigns.nvim",
    config = function()
      require("gitsigns").setup()
    end,
  },
  {
    "nvim-treesitter/nvim-treesitter",
    build = ":TSUpdate",
    config = function()
      require("nvim-treesitter.configs").setup({
        ensure_installed = {
          "markdown",
          "markdown_inline", 
          "bash", 
          "java",
          "sql",
          "python",
          "javascript",
          "typescript",
          "html",
          "css",
          "json",
          "yaml",
        },
        highlight = {
          enable = true,
        },
        indent = {
          enable = true,
        },
      })
    end,
  },
  {
    "nvim-telescope/telescope.nvim",
    dependencies = { "nvim-lua/plenary.nvim" },
    config = function()
      require("telescope").setup({
        defaults = {
          layout_config = {
            horizontal = {
              preview_width = 0.6,
            },
          },
        },
      })
    end,
  },
  {
    "github/copilot.vim",
    config = function()
      -- 기본 설정
      vim.g.copilot_no_tab_map = true
      vim.g.copilot_assume_mapped = true
      vim.g.copilot_tab_fallback = ""
    end,
  },
})

-- Keymap
vim.keymap.set("n", "<leader>e", ":NvimTreeToggle<CR>")
vim.keymap.set("i", "<C-J>", "copilot#Accept('<CR>')", { expr = true, silent = true, replace_keycodes = false })
vim.keymap.set("i", "<C-L>", "copilot#AcceptWord()", { expr = true, silent = true, replace_keycodes = false })
vim.keymap.set("n", "<leader>ff", ":Telescope find_files<CR>")
vim.keymap.set("n", "<leader>fg", ":Telescope live_grep<CR>")
vim.keymap.set("n", "<leader>fb", ":Telescope buffers<CR>")
vim.keymap.set("n", "<leader>fh", ":Telescope help_tags<CR>")
```


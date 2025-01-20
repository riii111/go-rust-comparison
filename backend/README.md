## ディレクトリ構成

https://pj100.esa.io/posts/25385 を参考
```
project-layout/
├── .devcontainer/                # DevContainer設定ファイル
│   └── devcontainer.json         # DevContainer用の設定ファイル（開発用コンテナ環境の設定）
├── .github/                      # GitHub Actionsや設定ファイル
│   └── workflows/                # ワークフロー定義（CI/CDパイプラインの設定ファイルを格納）
├── .vscode/                      # Visual Studio Codeの設定
│   └── settings.json             # ワークスペース設定（エディタのローカル設定を格納）
├── cmd/                          # 各アプリケーションのエントリーポイント
│   └── app/                      # メインアプリケーションのエントリーポイント
│       └── main.go               # mainパッケージを使用したアプリケーションの起動コード
├── configs/                      # 設定ファイルを格納
│   └── app.yaml                  # アプリケーションの設定ファイル（例: 環境変数、パラメータ）
├── docs/                         # ドキュメント関連
│   └── openapi.yaml              # OpenAPI（Swagger）の仕様書
├── internal/                     # 内部モジュール（外部公開しないコード）
│   ├── adapter/                  # 外部インターフェース（API、DB、その他インフラとの接続）
│   │   ├── database/             # DB接続関連
│   │   │   └── db.go             # データベース接続や操作を管理するコード
│   │   └── routes/               # ルーティング定義
│   │       └── routes.go         # エンドポイントとハンドラーを接続
│   ├── application/              # ユースケース層
│   │   ├── usecase/              # アプリケーション固有のユースケース
│   │   │   ├── user.go           # ユーザーに関するユースケース定義
│   │   │   └── user_test.go      # ユースケースのテストコード
│   ├── domain/                   # ドメイン層（エンティティやバリューオブジェクトを定義）
│   │   ├── user/                 # ユーザー関連のドメインコード
│   │   │   ├── entity.go         # ユーザーエンティティ
│   │   │   ├── repository.go     # リポジトリインターフェース
│   │   │   └── service.go        # ドメインサービス
│   ├── infrastructure/           # インフラ層
│   │   ├── repository/           # リポジトリ実装（DBや外部サービスとの接続）
│   │   │   └── user_repository.go # ユーザーリポジトリ実装
│   │   ├── db/                   # DB関連（マイグレーションなどを含む）
│   │   │   └── migrations/       # マイグレーションファイルを格納
│   │   └── external/             # 外部サービスとの統合（APIクライアントなど）
│   └── presentation/             # プレゼンテーション層
│       ├── handlers/             # ハンドラー（ルーティングとユースケースを結合）
│       │   └── user_handler.go   # ユーザーハンドラー
│       └── responses/            # レスポンスモデル
│           └── user_response.go  # ユーザー関連のレスポンスモデル
├── containers/                   # アプリケーションのコンテナ定義
│   ├── golang/                   # Golangアプリケーション用のDocker設定
│   │   └── Dockerfile            # GolangアプリケーションのDockerfile
│   ├── postgres/                 # PostgreSQLデータベース用のDocker設定
│   │   └── Dockerfile            # PostgreSQLのDockerfile
│   └── nginx/                    # Nginx設定（Webサーバー設定を格納）
│       ├── Dockerfile            # NginxのDockerfile
│       └── nginx.conf            # Nginxの設定ファイル
├── ecs/                          # AWS ECS関連設定
│   └── taskdef.json              # ECSタスク定義（コンテナとリソースの設定を記述）
├── codedeploy/                   # AWS CodeDeploy関連設定
│   └── appspec.yml               # CodeDeployアプリケーションの仕様ファイル
├── codebuild/                    # AWS CodeBuild関連設定
│   └── buildspec.yml             # CodeBuildのビルド手順を記述するファイル
├── test/                         # テスト関連コード
│   ├── integration/              # 統合テスト
│   │   └── integration_test.go   # 統合テストコード
│   └── unit/                     # 単体テスト
│       └── calc_test.go          # 単体テストコード
├── .env                          # 環境変数ファイル（開発用に使用する.envファイル）
├── Makefile                      # ビルドや管理タスクの定義（ビルド、テスト、デプロイ用のタスクを記述）
├── docker-compose.yml            # Docker Compose設定ファイル（複数コンテナを一括管理）
├── go.mod                        # Goモジュールの情報（依存関係の定義ファイル）
├── go.sum                        # Goモジュールの依存関係のハッシュ情報
├── README.md                     # リポジトリの概要説明（プロジェクトの目的や使い方を記述）

<<<<<<< HEAD
```
=======
```

## その他参考記事
https://github.com/golang-standards/project-layout/tree/master
>>>>>>> develop
